import React from "react";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { IList } from "@/constants/types/listsTypes";
import { updateList } from "@features/lists";
import { currentListSelector } from "@/features/tasks/ducks/selectors/currentListSelector";
import classNames from "classnames";

const ListTasksHeader = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(currentListSelector);

  if (list == null) return <></>;

  return (
    <header
      className={classNames([
        "row",
        "position-absolute",
        "input-text-inline-position",
        "list-info-height",
        "bg-blueish",
        "bg-opacity-75",
        "align-items-center",
        "ps-1",
        "pe-3",
        "blur-backdrop",
        "z-index-1",
      ])}
    >
      <input
        type="text"
        autoComplete="off"
        onChange={(e) => {
          dispatch(updateList({ id: list.id, name: e.target.value } as IList));
        }}
        className="text-truncate border-0 text-white bg-transparent fs-2"
        value={list.name}
      />
    </header>
  );
};

export { ListTasksHeader };
