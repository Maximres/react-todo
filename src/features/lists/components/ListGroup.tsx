import React, { memo } from "react";
import { GroupList } from "../ducks/selectors/selectorListsAndGroupLists";
import { IList } from "@/constants/types/listsTypes";
import ListItem from "@/features/lists/components/ListItem";
import { getListIcon } from "@/utils/helpers/getIcon";
import GroupItem from "@/features/lists/components/GroupItem";
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { isListItem } from "@/utils/helpers/listItemResolver";

type Props = {
  items: (IList | GroupList)[];
  onItemClick: (uid: string) => void;
  onListEditSubmit: (uid: string, name: string) => void;
  onGroupEditSubmit: (uid: string, name: string) => void;
  lastCreatedId?: string;
  dnd?: DroppableProvided;
};

const ListGroup = ({
  items,
  onItemClick,
  onListEditSubmit,
  onGroupEditSubmit,
  lastCreatedId,
  dnd,
}: Props) => {


  function renderListItem(item: IList, index: number) {
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
      />
    );
  }

  function renderGroupItem(item: GroupList, index: number) {
    return (
      <Draggable draggableId={item.id} index={index} key={item.id}>
        {(dndProvided) => (
          <GroupItem
            name={item.name}
            key={item.id}
            uid={item.id}
            isFocused={item.id === lastCreatedId}
            submitEdit={onGroupEditSubmit}
            dnd={dndProvided}
          >
            {
              <Droppable droppableId={"group_" + item.id} type="GROUP">
                {(provided) => (
                  <>
                    <ul
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="list-group list-group-flush p-1"
                    >
                      {item.lists &&
                        item.lists.map((listItem, index) => {
                          return renderListItem(listItem, index);
                        })}
                    {provided.placeholder}
                    </ul>
                  </>
                )}
              </Droppable>
            }
          </GroupItem>
        )}
      </Draggable>
    );
  }

  return (
    <ul
      className="list-group list-group-flush"
      ref={dnd?.innerRef}
      {...dnd?.droppableProps}
    >
      {items.map((item, index) => {
        if (isListItem(item)) {
          return renderListItem(item, index);
        }

        return renderGroupItem(item, index);
      })}
      {dnd?.placeholder}
    </ul>
  );
};

export default memo(ListGroup);
