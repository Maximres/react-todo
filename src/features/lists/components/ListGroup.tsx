import React, { memo } from "react";
import { GroupList } from "../ducks/selectors/selectorListsAndGroupLists";
import { IList } from "@/constants/types/listsTypes";
import ListItem from "@/features/lists/components/ListItem";
import { getListIcon } from "@/utils/helpers/getIcon";
import GroupItem from "@/features/lists/components/GroupItem";

type Props = {
  items: (IList | GroupList)[];
  onItemClick: (uid: string) => void;
  onEditSubmit: (uid: string, name: string) => void;
  lastCreatedId?: string;
};

const ListGroup = ({
  items,
  onItemClick,
  onEditSubmit,
  lastCreatedId,
}: Props) => {

  function isListItem(value: IList | GroupList): value is IList {
    return typeof (value as IList).groupId !== "undefined";
  }

  function renderListItem(item: IList) {
    return (
      <ListItem
        key={item.id}
        uid={item.id}
        name={item.name}
        total={item.tasksTotal}
        Icon={getListIcon(item.iconName)}
        onClick={onItemClick}
        submitEdit={onEditSubmit}
        isFocused={item.id === lastCreatedId}
      />
    );
  }

  function renderGroupItem(item: GroupList) {
    return (
      <GroupItem name={item.name} key={item.id}>
        {
          <ul className="list-group list-group-flush p-1">
            {item.lists &&
              item.lists.map((listItem) => {
                return renderListItem(listItem);
              })}
          </ul>
        }
      </GroupItem>
    );
  }

  return (
    <ul className="list-group list-group-flush">
      {items.map((item) => {
        if (isListItem(item)) {
          return renderListItem(item);
        }

        return renderGroupItem(item);
      })}
    </ul>
  );
};

export default memo(ListGroup);
