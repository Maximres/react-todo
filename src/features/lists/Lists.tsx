import React, { useEffect, useState } from "react";
import Icons from "@/components/AppIcons";
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

const Lists = () => {
  const [lastCreatedId, setLastCreatedId] = useState("");
  const defaultLists = useAppSelector((x) => x.lists.defaultLists);
  const userLists = useAppSelector((x) => x.lists.userLists);
  const selectedList = useAppSelector((x) => x.lists.selectedList);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("rerender")
  })

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
    setLastCreatedId(dispatchResult.payload.id)
  };

  useEffect(() => {
    syncDocumentTitle(selectedList?.name);
  }, [selectedList]);

  useEffect(() => {

  }, [lastCreatedId])

  return (
    <aside
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-light"
      style={{ width: 350 }}
      id="list"
    >
      <header>
        <div className="navbar py-3 pb-0">
          <div className="d-flex align-items-center w-100 px-3">
            <span className="navbar-brand ">
              <span className="account-icon">
                <Icons.User className="text-white" />
              </span>
            </span>
            <div className="navbar-nav flex-grow-1 text-truncate">
              <span title="Maxim" className="fa-x fw-bold text-truncate">
                Maxim
              </span>
              <span
                title="test@gmail.com"
                className="fa-sm lh-base text-muted text-truncate"
              >
                test@gmail.com
              </span>
            </div>
          </div>
          <div className="d-flex align-items-center w-100 px-3 my-2">
            <input
              className="form-control form-control-sm "
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <Icons.Search className="form-control-after-search" />
          </div>
          <hr className="w-100 m-0 mt-2" />
        </div>
      </header>
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
            {userLists.map((item) => {
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
            })}

            <GroupItem name="1">
              {
                <ul className="list-group list-group-flush">
                  <ListItem
                    onClick={handleItemClick}
                    isSubItem={true}
                    submitEdit={() => {
                    }}
                    name={"hhelo"}
                    uid={String(+Date.now)}
                    total={0}
                  />
                  <ListItem
                    onClick={handleItemClick}
                    isSubItem={true}
                    submitEdit={() => {
                    }}
                    name={"hhelo"}
                    uid={String(+Date.now)}
                    total={0}
                  />
                  <ListItem
                    onClick={handleItemClick}
                    isSubItem={true}
                    submitEdit={() => {
                    }}
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
      <footer>
        <div className="border-top mt-auto d-flex justify-content-between align-items-center ">
          <button
            className="btn d-flex align-items-center flex-grow-1 m-1 p-2"
            onClick={handleListCreation}
          >
            <Icons.Plus title="Add a list" className="fs-5 pe-2" />
            <div className="">
              <span className="pointer">New list</span>
            </div>
          </button>

          <button type="button" className="btn m-1 p-2">
            <Icons.NewGroup title="Create a new group" className="fs-5" />
          </button>
        </div>
      </footer>
    </aside>
  );
};

export { Lists };
