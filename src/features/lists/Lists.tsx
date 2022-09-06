import React, { useEffect, useMemo, useState } from "react";
import GroupItem from "./components/GroupItem";
import ListItem from "./components/ListItem";
import { useAppSelector } from "@/constants/types/redux";
import { getListIcon } from "@/utils/helpers/getIcon";
import { useDispatch } from "react-redux";
import {
  createList,
  selectList,
  updateList,
} from "@/features/lists/ducks/listsSlice";
import { NEW_LIST_NAME } from "@/features/tasks/ducks/constants";
import { IList } from "@/constants/types/listsTypes";
import { ListHeader } from "./components/ListHeader";
import { ListFooter } from "./components/ListFooter";
import _orderBy from "lodash/orderBy";
import {
  GroupList,
  selectorListsAndGroupLists,
} from "./ducks/selectors/selectorListsAndGroupLists";

const Lists = () => {
  const [lastCreatedId, setLastCreatedId] = useState("");
  const defaultLists = useAppSelector((x) => x.lists.defaultLists);
  const userLists = useAppSelector((x) => x.lists.userLists);
  const selectedList = useAppSelector((x) => x.lists.selectedList);
  const listsGroups = useAppSelector(selectorListsAndGroupLists);
  const orderedListsGroups = useMemo(() => {
    return _orderBy(listsGroups, ["order"], ["asc"]);
  }, [listsGroups]);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("test:rerended");
  });

  const handleItemClick = (uid: string) => {
    const selectedList = userLists.find((i) => i.id === uid);
    if (!selectedList) return;

    dispatch(selectList(selectedList));
  };

  const handleNameEditSubmit = (uid: string, name: string) => {
    dispatch(updateList({ id: uid, name: name } as IList));
  };

  const syncDocumentTitle = (name?: string) => {
    let title = "To Do";

    if (name != null) title = `${name} - ${title}`;

    window.document.title = title;
  };

  const getUntitledListsCount = () => {
    const untitledCount = userLists.filter((x) =>
      x.name.startsWith(NEW_LIST_NAME),
    ).length;
    return untitledCount;
  };

  const handleListCreation = () => {
    const untitledCount = getUntitledListsCount();
    const number = untitledCount > 0 ? untitledCount : "";
    const name = `${NEW_LIST_NAME} ${number}`.trimEnd();
    const dispatchResult = dispatch(createList(name));
    setLastCreatedId(dispatchResult.payload.id);
  };

  useEffect(() => {
    syncDocumentTitle(selectedList?.name);
  }, [selectedList]);

  useEffect(() => {}, [lastCreatedId]);

  function isListItem(value: IList | GroupList): value is IList {
    return typeof (value as IList).groupId !== "undefined";
  }

  return (
    <aside
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-light"
      style={{ width: 350 }}
      id="list"
    >
      <ListHeader />
      <section className="flex-grow-1 overflow-auto">
        <div className="w-100">
          <ul className="list-group list-group-flush">
            {defaultLists.map((item) => {
              return (
                <ListItem
                  uid={item.id}
                  key={item.id}
                  name={item.name}
                  total={item.tasksTotal}
                  Icon={getListIcon(item.iconName)}
                  onClick={handleItemClick}
                  submitEdit={handleNameEditSubmit}
                />
              );
            })}
            {/*<ListItem name={"My day"} Icon={<Icons.MyDay/>} />*/}
            {/*<ListItem name={"Important"} Icon={<Icons.Favorite/>}/>*/}
            {/*<ListItem name={"Planned"} Icon={<Icons.Planned/>}/>*/}
            {/*<ListItem name={"All"} Icon={<Icons.All/>}/>*/}
            {/*<ListItem name={"Tasks"} Icon={<Icons.Task/>} />*/}
          </ul>
          <hr className="w-100 m-0" />
          <ul className="list-group list-group-flush">
            {orderedListsGroups.map((item) => {
              if (isListItem(item)) {
                return (
                  <ListItem
                    key={item.id}
                    uid={item.id}
                    name={item.name}
                    total={item.tasksTotal}
                    Icon={getListIcon(item.iconName)}
                    onClick={handleItemClick}
                    submitEdit={handleNameEditSubmit}
                    isFocused={item.id === lastCreatedId}
                  />
                );
              }

              return (
                <GroupItem name={item.name} key={item.id}>
                  {
                    <ul className="list-group list-group-flush p-1">
                      {item.lists.map((listItem) => {
                        return (
                          <ListItem
                            isSubItem={true}
                            key={listItem.id}
                            uid={listItem.id}
                            name={listItem.name}
                            total={listItem.tasksTotal}
                            Icon={getListIcon(listItem.iconName)}
                            onClick={handleItemClick}
                            submitEdit={handleNameEditSubmit}
                            isFocused={listItem.id === lastCreatedId}
                          />
                        );
                      })}
                    </ul>
                  }
                </GroupItem>
              );
            })}
            <GroupItem name="1">
              {
                <ul className="list-group list-group-flush">
                  <ListItem
                    onClick={handleItemClick}
                    isSubItem={true}
                    submitEdit={() => {}}
                    name={"hhelo"}
                    uid={String(+Date.now)}
                    total={0}
                  />
                  <ListItem
                    onClick={handleItemClick}
                    isSubItem={true}
                    submitEdit={() => {}}
                    name={"hhelo"}
                    uid={String(+Date.now)}
                    total={0}
                  />
                  <ListItem
                    onClick={handleItemClick}
                    isSubItem={true}
                    submitEdit={() => {}}
                    name={"hhelo"}
                    uid={String(+Date.now)}
                    total={0}
                  />
                </ul>
              }
            </GroupItem>
          </ul>
        </div>
      </section>
      <ListFooter handleListCreation={handleListCreation} />
    </aside>
  );
};

export { Lists };
