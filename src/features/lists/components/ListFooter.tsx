import Icons from "@/components/AppIcons";
import React from "react";
import { useDispatch } from "react-redux";
import {
  NEW_GROUP_NAME,
  NEW_LIST_NAME,
} from "@/features/tasks/ducks/constants";
import { createGroup, createList } from "@features/lists";
import { useAppSelector } from "@/constants/types/redux";
import { IGroup, IList } from "@/constants/types/listsTypes";

const ListFooter = ({
  setLastCreatedId,
}: {
  setLastCreatedId: (id: string) => void;
}) => {
  const userLists = useAppSelector((x) => x.lists.userLists);
  const groups = useAppSelector((x) => x.lists.groups);
  const dispatch = useDispatch();

  const getUntitledCount = (
    collection: IGroup[] | IList[] = [],
    name: string,
  ) => {
    const untitledCount = collection.filter((x) =>
      x.name.startsWith(name),
    ).length;
    return untitledCount;
  };

  const handleListCreation = () => {
    const untitledCount = getUntitledCount(userLists, NEW_LIST_NAME);
    const number = untitledCount > 0 ? untitledCount : "";
    const name = `${NEW_LIST_NAME} ${number}`.trimEnd();
    const dispatchResult = dispatch(createList(name));
    setLastCreatedId(dispatchResult.payload.id);
  };

  const handleGroupCreation = () => {
    const untitledCount = getUntitledCount(groups, NEW_GROUP_NAME);
    const number = untitledCount > 0 ? untitledCount : "";
    const name = `${NEW_GROUP_NAME} ${number}`.trimEnd();
    const dispatchResult = dispatch(createGroup(name));
  };

  return (
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

        <button
          type="button"
          className="btn m-1 p-2"
          onClick={handleGroupCreation}
        >
          <Icons.NewGroup title="Create a new group" className="fs-5" />
        </button>
      </div>
    </footer>
  );
};

export { ListFooter };