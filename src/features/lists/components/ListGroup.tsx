﻿import React, { memo, useCallback, useEffect, useState } from "react";
import { IGroupedList } from "../ducks/selectors/selectorOrderedListsAndGroups";
import { IGroup, IList } from "@/constants/types/listsTypes";
import ListItem from "@/features/lists/components/ListItem";
import { getListIcon } from "@/utils/helpers/getIcon";
import GroupItem from "@/features/lists/components/GroupItem";
import { isListItem } from "@/utils/helpers/listItemResolver";
import { useDrop } from "react-dnd";
import _isEmpty from "lodash/isEmpty";
import { getOrderNumber } from "@/utils/helpers/order";
import { updateGroup, updateList } from "@features/lists";
import { useDispatch } from "react-redux";
import { IOrderable } from "@/constants/types/stateTypes";

type Props = {
  items: (IList | IGroupedList)[];
  onItemClick: (uid: string) => void;
  onListEditSubmit: (uid: string, name: string) => void;
  onGroupEditSubmit: (uid: string, name: string) => void;
  lastCreatedId?: string;
  dndDisabled?: boolean;
};

type DragType = {
  id: string;
  type: string;
  parentId: string | undefined;
};

type ListType = [id: string | null, parentId?: string];

const getSourceItem = (
  dragEndItem: DragType,
  items: (IList | IGroupedList)[],
) => {
  const isSubItem = !!dragEndItem.parentId;

  if (isSubItem) {
    const sourceGroup = items.find(
      (x) => x.id === dragEndItem.parentId,
    ) as IGroupedList;
    const source = sourceGroup.lists?.find(
      (x) => x.id === dragEndItem.id,
    ) as IList;
    return source;
  } else {
    const source = items.find((x) => x.id === dragEndItem.id) as IList;
    return source;
  }
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
  const [dropPosition, setDropPosition] = useState<
    "above" | "bellow" | "center"
  >("center");
  const [dropItem, setDropItem] = useState<string | null>(null);
  const [dropType, setDropType] = useState<string>("");
  const [dropParentId, setDropParentId] = useState<string | undefined>();

  useEffect(() => {
    //some comment
    // console.log("ListGroup:rendered");
  });

  const [{ getItem, isOver, canDrop }, drop] = useDrop(() => ({
    accept: ["list", "group"],
    drop: () => ({ name: "group & lists" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      getItem: monitor.getItem(),
    }),
  }));

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
    if (dragEndItem == null || dropItem == null) return;
    if (dropItem === dragEndItem.id) return;

    const { id: dragId, type: dragType, parentId: dragParent } = dragEndItem;
    const moveListToTopLevel = !dropParentId;
    const moveListToSubGroup = !!dropParentId;
    debugger;
    //list dragged
    if (dragType === "list") {
      const source = getSourceItem(dragEndItem, items);

      if (source == null) return;

      //list moved from sub to top level
      if (dropType === "list" && moveListToTopLevel) {
        const destItemIndex = items.findIndex((x) => x.id === dropItem);
        if (destItemIndex < 0) return;

        let placement = destItemIndex;
        if (dropPosition === "above") placement--;
        if (dropPosition === "bellow") placement++;

        let siblingDestItem = items[placement];
        let siblingsOrder =
          siblingDestItem != null
            ? siblingDestItem?.order
            : placement >= items.length
            ? getOrderNumber()
            : -1;

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
          (x) => x.id == dropItem,
        );
        if (destListItemIndex == null || destListItemIndex < 0) return;

        let placement = destListItemIndex;
        if (dropPosition === "above") placement--;
        if (dropPosition === "bellow") placement++;

        let siblingDestItem = destGroupItems[placement];
        let siblingsOrder =
          siblingDestItem != null
            ? siblingDestItem?.order
            : placement >= destGroupItems.length
            ? getOrderNumber()
            : -1;

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
      if (dropType === "group" && dropPosition !== "center") {
        const destGroupIndex = items.findIndex((x) => x.id === dropItem);
        if (destGroupIndex < 0) return;

        let placement = destGroupIndex;
        if (dropPosition === "above") placement--;
        if (dropPosition === "bellow") placement++;

        let siblingDestItem = items[placement];
        let siblingsOrder =
          siblingDestItem != null
            ? siblingDestItem?.order
            : placement >= items.length
            ? getOrderNumber()
            : -1;

        const destGroupItem = items[destGroupIndex] as IGroupedList;
        const meanOrder = (destGroupItem.order + siblingsOrder) / 2.0;
        const srcCopy: IList = { ...source, order: meanOrder, groupId: "" };
        dispatch(updateList(srcCopy));
      }

      //list moved from anywhere to sub group
      if (dropType === "group" && dropPosition === "center") {
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

      let placement = destIndex;
      if (dropPosition === "above") placement--;
      if (dropPosition === "bellow") placement++;

      let siblingDestItem = items[placement];
      let siblingsOrder =
        siblingDestItem != null
          ? siblingDestItem?.order
          : placement >= items.length
          ? getOrderNumber()
          : -1;

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
    setDropParentId(undefined);
    setDropType("");
    setDropItem(null);
  }, [dragEndItem]);

  const onDragEnd = useCallback(
    (id: string, type: string, parentId: string | undefined) => {
      setDragEndItem({ id, type, parentId });
    },
    [],
  );

  const handleHoverDrop = useCallback(
    (
      dropId: string | null,
      type: string,
      position: "above" | "bellow" | "center",
      parentId?: string,
    ) => {
      console.log({ dropId, type, position, parentId, dropItem });

      if (dropId == null && dropId !== dropItem) setDropItem(null);
      if (dropId === dropItem && dropPosition === position) return;

      setDropItem(dropId);
      setDropType(type);
      setDropParentId(parentId);
      setDropPosition(position);
    },
    [],
  );

  const getBorderClass = useCallback(
    (id: string) => {
      if (dropItem == null || dropItem !== id) return "";

      switch (dropPosition) {
        case "center":
          return "drag-around";
        case "above":
          return "drag-top";
        case "bellow":
          return "drag-bottom";
      }

      return "";
    },
    [dropItem, dropPosition],
  );

  const onDragEnd_obsolete = (result: any) => {
    const { source: src, destination: dest, draggableId } = result;

    if (!dest) return;

    if (result.type === "GROUP") {
      //source from group

      //to another group
      if (dest.droppableId.includes("group")) {
        const groupId = dest.droppableId.replace("group_", "");
        const groupSrcId = src.droppableId.replace("group_", "");
        const groupItem = items.find((x) => x.id === groupId) as IGroupedList;

        const groupSrcItem = items.find(
          (x) => x.id === groupSrcId,
        ) as IGroupedList;

        if (!groupItem) return;

        if (!_isEmpty(groupItem.lists)) {
          const listItem = groupItem.lists![dest.index];
          const orderNumber = listItem.order;
          const nextItem = groupItem.lists![dest.index + 1];
          let orderStamp = getOrderNumber();
          if (nextItem) {
            orderStamp = nextItem.order;
          }
          const meanOrder = (orderNumber + (orderStamp ?? 0.1)) / 2.0;

          const srcItem = groupSrcItem.lists?.find((x) => x.id === draggableId);
          if (!srcItem) return;

          const srcItemCopy = {
            ...srcItem,
            order: meanOrder,
            groupId: groupId,
          };

          dispatch(updateList(srcItemCopy as IList));
          return;
        }

        const srcItem = groupSrcItem.lists?.find((x) => x.id === draggableId);
        if (!srcItem) return;

        const srcItemCopy = {
          ...srcItem,
          order: getOrderNumber(),
          groupId: groupId,
        };
        dispatch(updateList(srcItemCopy as IList));
        return;
      }
    }

    //to top level list
    const movedUp = src.index >= dest.index;
    const nextIndex = movedUp ? -1 : +1;
    const destItemAbove = items[dest.index];
    const destItemBelow = items[dest.index + 1];
    const meanOrder =
      (destItemAbove.order + (destItemBelow?.order ?? getOrderNumber())) / 2.0;
    const srcItem = items.find((x) => x.id === draggableId);
    if (!srcItem) return;

    const srcItemCopy = { ...srcItem, order: meanOrder, groupId: "" };
    if (isListItem(srcItemCopy)) {
      dispatch(updateList(srcItemCopy as IList));
    } else {
      dispatch(updateGroup(srcItemCopy as IGroup));
    }

    return;
  };

  return (
    <ul ref={drop} className="list-group list-group-flush">
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
