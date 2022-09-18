import React, { memo, useCallback, useEffect, useState } from "react";
import { IGroup, IList } from "@/constants/types/listsTypes";
import ListItem from "@/features/lists/components/ListItem";
import { getListIcon } from "@/utils/helpers/getIcon";
import GroupItem from "@/features/lists/components/GroupItem";
import { isListItem } from "@/utils/helpers/listItemResolver";
import { getOrderNumber } from "@/utils/helpers/order";
import { updateGroup, updateList } from "@features/lists";
import { useDispatch } from "react-redux";
import { IOrderable } from "@/constants/types/stateTypes";
import {
  DndElement,
  DragType,
  DropPosition,
  IGroupedList,
} from "@/features/lists/ducks/constants/types";
import {
  getDestItemPlacement,
  getSiblingsOrderNumber,
  getSourceItem,
} from "@/features/lists/ducks/helpers/DndHelpers";

type Props = {
  items: (IList | IGroupedList)[];
  onItemClick: (uid: string) => void;
  onListEditSubmit: (uid: string, name: string) => void;
  onGroupEditSubmit: (uid: string, name: string) => void;
  lastCreatedId?: string;
  dndDisabled?: boolean;
};

const ListGroup = ({
  items,
  onItemClick,
  onListEditSubmit,
  onGroupEditSubmit,
  lastCreatedId,
  dndDisabled = false,
}: Props) => {
  const dispatch = useDispatch();

  const [dragEndItem, setDragEndItem] = useState<DragType | null>(null);
  const [dropPosition, setDropPosition] = useState<DropPosition>("inside");
  const [dropItem, setDropItem] = useState<string | null>(null);
  const [dropType, setDropType] = useState<DndElement>("list");
  const [dropParentId, setDropParentId] = useState<string | undefined>();

  const renderListItem = (item: IList, parentId?: string) => {
    return (
      <ListItem
        key={item.id}
        uid={item.id}
        name={item.name}
        total={item.tasksTotal}
        Icon={getListIcon(item.iconName)}
        onClick={onItemClick}
        submitEdit={onListEditSubmit}
        isFocused={item.id === lastCreatedId}
        isDragDisabled={dndDisabled}
        parentId={parentId}
        dropTargetClass={getBorderClass(item.id)}
        onDragEnd={onDragEnd}
        handleHoverDrop={handleHoverDrop}
      />
    );
  };

  const renderSubGroupItem = (groupItem: IGroupedList) => (
    <ul className="list-group list-group-flush p-1">
      {groupItem.lists &&
        groupItem.lists.map((listItem) => {
          return renderListItem(listItem, groupItem.id);
        })}
    </ul>
  );

  const renderGroupItem = (item: IGroupedList) => {
    return (
      <GroupItem
        name={item.name}
        key={item.id}
        uid={item.id}
        isFocused={item.id === lastCreatedId}
        submitEdit={onGroupEditSubmit}
        handleHoverDrop={(dropId, dropType, position) => {
          handleHoverDrop(dropId, dropType, position);
        }}
        dropTargetClass={getBorderClass(item.id)}
        onDragEnd={onDragEnd}
      >
        {renderSubGroupItem(item)}
      </GroupItem>
    );
  };

  useEffect(() => {
    debugger
    const didNotDrop = dragEndItem == null || dropItem == null;
    if (didNotDrop || dropItem === dragEndItem.id) {
      resetDnd();
      return;
    }

    const { type: dragType } = dragEndItem;

    //list dragged
    if (dragType === "list") {
      const moveListToTopLevel = !dropParentId;
      const moveListToSubGroup = !!dropParentId;
      const source = getSourceItem(dragEndItem, items);

      if (source == null) return;

      //list moved from sub to top level
      if (dropType === "list" && moveListToTopLevel) {
        const destItemIndex = items.findIndex((x) => x.id === dropItem);
        if (destItemIndex < 0) return;

        const placement = getDestItemPlacement(destItemIndex, dropPosition);
        const siblingsOrder = getSiblingsOrderNumber(items, placement);

        const destItem = items[destItemIndex];
        const meanOrder = (destItem.order + siblingsOrder) / 2.0;
        const srcCopy: IList = { ...source, order: meanOrder, groupId: "" };
        dispatch(updateList(srcCopy));
      }

      //list moved from sub level to another sub level
      if (dropType === "list" && moveListToSubGroup) {
        const destGroupIndex = items.findIndex((x) => x.id === dropParentId);
        if (destGroupIndex < 0) return;

        const destGroupItem = items[destGroupIndex] as IGroupedList;
        const destGroupItems = destGroupItem.lists ?? [];
        const destListItemIndex = destGroupItems.findIndex(
          (x) => x.id === dropItem,
        );
        if (destListItemIndex == null || destListItemIndex < 0) return;

        const placement = getDestItemPlacement(destListItemIndex, dropPosition);
        const siblingsOrder = getSiblingsOrderNumber(destGroupItems, placement);

        const destItem = destGroupItems[destListItemIndex];
        const meanOrder = (destItem.order + siblingsOrder) / 2.0;
        const srcCopy: IList = {
          ...source,
          order: meanOrder,
          groupId: dropParentId,
        };
        dispatch(updateList(srcCopy));
      }

      //list moved to top level NEXT to group
      if (dropType === "group" && dropPosition !== "inside") {
        const destGroupIndex = items.findIndex((x) => x.id === dropItem);
        if (destGroupIndex < 0) return;

        const placement = getDestItemPlacement(destGroupIndex, dropPosition);
        const siblingsOrder = getSiblingsOrderNumber(items, placement);

        const destGroupItem = items[destGroupIndex] as IGroupedList;
        const meanOrder = (destGroupItem.order + siblingsOrder) / 2.0;
        const srcCopy: IList = { ...source, order: meanOrder, groupId: "" };
        dispatch(updateList(srcCopy));
      }

      //list moved from anywhere to sub group
      if (dropType === "group" && dropPosition === "inside") {
        const destGroupIndex = items.findIndex((x) => x.id === dropItem);
        if (destGroupIndex < 0) return;

        const destGroupItem = items[destGroupIndex] as IGroupedList;
        const destGroupItems = destGroupItem.lists ?? [];
        const destListFirstItem = destGroupItems[0];
        let siblingsOrder = getOrderNumber();
        if (destListFirstItem != null) {
          siblingsOrder = destListFirstItem.order;
        }
        const lowerOrder = siblingsOrder - 1;
        const srcCopy: IList = {
          ...source,
          order: lowerOrder,
          groupId: destGroupItem.id,
        };
        dispatch(updateList(srcCopy));
      }
    }

    if (dragType === "group") {
      const destIndex = items.findIndex((x) => x.id === dropItem);
      if (destIndex < 0) return;

      const placement = getDestItemPlacement(destIndex, dropPosition);
      const siblingsOrder = getSiblingsOrderNumber(items, placement);

      const destItem = items[destIndex] as IOrderable;
      const meanOrder = (destItem.order + siblingsOrder) / 2.0;

      const source = items.find((x) => x.id === dragEndItem.id) as IGroupedList;
      const srcCopy: IGroup = {
        ...source,
        order: meanOrder,
      };

      dispatch(updateGroup(srcCopy));
    }

    //reset dnd items
    resetDnd();
  }, [dragEndItem]);

  const resetDnd = useCallback(() => {
    setDropItem(null);
    setDropParentId(undefined);
  }, []);

  const onDragEnd = useCallback(
    (id: string | null, type: DndElement, parentId: string | undefined) => {
      if (id == null) {
        resetDnd();
        return;
      }
      setDragEndItem({ id, type, parentId });
    },
    [],
  );

  const handleHoverDrop = useCallback(
    (
      dropId: string | null,
      type: DndElement,
      position: DropPosition,
      parentId?: string,
    ) => {
      if (dropId == null && dropId !== dropItem) setDropItem(null);
      if (dropId === dropItem && dropPosition === position) return;

      setDropItem(dropId);
      setDropType(type);
      setDropParentId(parentId);
      setDropPosition(position);
    },
    [dropItem, dropPosition],
  );

  const getBorderClass = useCallback(
    (id: string) => {
      if (dropItem == null || dropItem !== id) return "";

      switch (dropPosition) {
        case "inside":
          return "drag-around";
        case "above":
          return "drag-top";
        case "below":
          return "drag-bottom";
      }

      return "";
    },
    [dropItem, dropPosition],
  );

  return (
    <ul className="list-group list-group-flush">
      {items.map((item, index) => {
        if (isListItem(item)) {
          return renderListItem(item);
        }

        return renderGroupItem(item);
      })}
    </ul>
  );
};

export default memo(ListGroup);
