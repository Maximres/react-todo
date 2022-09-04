import React from "react";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { IList } from "@/constants/types/listsTypes";
import { updateList } from "@features/lists";
import { selectCurrentList } from "@/features/tasks/ducks/selectors/selectCurrentList";
import classNames from "classnames";

const ListInfoHeader = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectCurrentList);

  if (list == null) return <></>;

  return (
    <header
      className={classNames([
        "row",
        "position-absolute",
        "input-text-inline-position",
        "list-info-height",
        "bg-light",
        "bg-opacity-75",
        "align-items-center",
        "ps-1",
        "pe-3",
        "blur-backdrop",
      ])}
    >
      <input
        type="text"
        autoComplete="off"
        onChange={(e) => {
          dispatch(updateList({ id: list.id, name: e.target.value } as IList));
        }}
        className="text-truncate border-0  bg-transparent fs-2"
        value={list.name}
      />
    </header>
  );
};

export { ListInfoHeader };
