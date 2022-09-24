import React, { memo, useEffect } from "react";
import { IList } from "@/constants/types/listsTypes";
import ListItem from "@/features/lists/components/ListItem";
import { getListIcon } from "@/utils/helpers/getIcon";
import GroupItem from "@/features/lists/components/GroupItem";
import { isListItem } from "@/utils/helpers/listItemResolver";
import { useDispatch } from "react-redux";
import { IGroupedList } from "@/features/lists/ducks/constants/types";
import { updateGroup, updateList } from "@features/lists";
import { useDnd } from "@/features/lists/ducks/hooks/useDnd";
import { RootState, useAppSelector } from "@/constants/types/redux";
import { createSelector } from "@reduxjs/toolkit";

type Props = {
  items: (IList | IGroupedList)[];
  onItemClick: (uid: string) => void;
  onListEditSubmit: (uid: string, name: string) => void;
  onGroupEditSubmit: (uid: string, name: string) => void;
  dndDisabled?: boolean;
};

const ListGroup = ({
  items,
  onItemClick,
  onListEditSubmit,
  onGroupEditSubmit,
  dndDisabled = false,
}: Props) => {
  const dispatch = useDispatch();

  const {
    onHover,
    getHoveringStyle,
    dragEndItem,
    reset,
    onDragEnd,
    getDragResult,
  } = useDnd();

  const renderListItem = (item: IList, parentId?: string) => {
    return (
      <ListItem
        key={item.id}
        uid={item.id}
        name={item.name}
        total={item.tasksTotal}
        Icon={getListIcon(item.iconName)}
        onClick={onItemClick}
        onSubmitEdit={onListEditSubmit}
        isDragDisabled={dndDisabled}
        parentId={parentId}
        hoverClass={getHoveringStyle(item.id)}
        onDragEnd={onDragEnd}
        onDropHover={onHover}
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
        onSubmitEdit={onGroupEditSubmit}
        onDropHover={onHover}
        hoverClass={getHoveringStyle(item.id)}
        onDragEnd={onDragEnd}
      >
        {renderSubGroupItem(item)}
      </GroupItem>
    );
  };

  const updateDrag = () => {
    const item = getDragResult(items);
    if (item == null) return;

    if (isListItem(item)) {
      dispatch(updateList(item));
      return;
    }
    dispatch(updateGroup(item));
  };

  useEffect(() => {
    try {
      updateDrag();
    } finally {
      reset();
    }
  }, [dragEndItem]);

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
