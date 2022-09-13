import React, { memo, useEffect, useRef } from "react";
import { GroupList } from "../ducks/selectors/selectorListsAndGroupLists";
import { IList } from "@/constants/types/listsTypes";
import ListItem from "@/features/lists/components/ListItem";
import { getListIcon } from "@/utils/helpers/getIcon";
import GroupItem from "@/features/lists/components/GroupItem";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { isListItem } from "@/utils/helpers/listItemResolver";

type Props = {
  items: (IList | GroupList)[];
  onItemClick: (uid: string) => void;
  onListEditSubmit: (uid: string, name: string) => void;
  onGroupEditSubmit: (uid: string, name: string) => void;
  lastCreatedId?: string;
  dnd: DroppableProvided;
  dndDisabled?: boolean;
};

let indexer = 0;

const ListGroup = ({
  items,
  onItemClick,
  onListEditSubmit,
  onGroupEditSubmit,
  lastCreatedId,
  dnd,
  dndDisabled = false,
}: Props) => {
  useEffect(() => {
    //some comment
    console.log("ListGroup:rendered");
    counter.current = 0;
  });

  const counter = useRef<number>(0);

  const renderListItem = (item: IList, index: number, isDragDisabled: boolean, isSubItem: boolean = false) => {
    return (
      <ListItem
        key={item.id}
        uid={item.id}
        index={index}
        name={item.name}
        total={item.tasksTotal}
        Icon={getListIcon(item.iconName)}
        onClick={onItemClick}
        submitEdit={onListEditSubmit}
        isFocused={item.id === lastCreatedId}
        isDragDisabled={isDragDisabled}
        isSubItem={isSubItem}
      />
    );
  };

  const renderSubGroupItem = (item: GroupList, parentIndex: number, isDragDisabled: boolean) => (
    <div>
      <ul className="list-group list-group-flush p-1">
        {item.lists &&
          item.lists.map((listItem, index) => {
            return renderListItem(listItem, index + parentIndex, isDragDisabled, true);
          })}
      </ul>
    </div>
  );

  const renderGroupItem = (item: GroupList, index: number, isDragDisabled: boolean) => {
    console.log(counter.current);

    return (
      <Draggable
        draggableId={item.id}
        index={index}
        key={item.id}
        isDragDisabled={isDragDisabled}
      >
        {(dndProvided, snapshot) => (
          <div>
            <GroupItem
              name={item.name}
              key={item.id}
              uid={item.id}
              isFocused={item.id === lastCreatedId}
              submitEdit={onGroupEditSubmit}
              dnd={dndProvided}
            >
              {renderSubGroupItem(item, index, snapshot.isDragging)}
            </GroupItem>
          </div>

        )}
      </Draggable>
    );
  };

  return (
    <ul
      className="list-group list-group-flush"
      ref={dnd.innerRef}
      {...dnd.droppableProps}
    >
      {items.map((item, index) => {
        if (isListItem(item)) {
          return renderListItem(item, index, dndDisabled);
        }

        return renderGroupItem(item, index, dndDisabled);
      })}
      {dnd.placeholder}
    </ul>
  );
};

export default memo(ListGroup);
