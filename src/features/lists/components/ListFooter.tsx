import Icons from "@/components/AppIcons";
import React from "react";
import { useDispatch } from "react-redux";
import { NEW_LIST_NAME } from "@/features/tasks/ducks/constants";
import { createList } from "@features/lists";
import { useAppSelector } from "@/constants/types/redux";

const ListFooter = ({
  setLastCreatedId,
}: {
  setLastCreatedId: (id: string) => void;
}) => {
  const userLists = useAppSelector((x) => x.lists.userLists);
  const dispatch = useDispatch();

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

        <button type="button" className="btn m-1 p-2">
          <Icons.NewGroup title="Create a new group" className="fs-5" />
        </button>
      </div>
    </footer>
  );
};

export { ListFooter };