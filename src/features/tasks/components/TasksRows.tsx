﻿import React, { memo } from "react";
import Icons from "@/components/AppIcons";
import { IRow } from "@/constants/types/tasksTypes";
import { useAppDispatch } from "@/constants/types/redux";
import {
  toggleChecked,
  toggleFavorite,
  toggleSelected,
} from "@/features/tasks";

type Props = {
  tasks: IRow[];
};

const TasksComponent = ({ tasks }: Props): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const handleCheck = (task: IRow) => {
    dispatch(toggleChecked({ task: task, isChecked: !task.isChecked }));
  };

  const handleToggleFavorite = (e: any, task: IRow) => {
    e.stopPropagation();
    dispatch(toggleFavorite({ task: task, isImportant: !task.isImportant }));
  };

  const toggleSideBar = (task: IRow) => {
    dispatch(toggleSelected({ task: task }));
  };

  const elements = tasks.map((row) => (
    <tr className="row" key={row.id} onClick={() => toggleSideBar(row)}>
      <td className="px-1 col-1">
        <div className="d-flex justify-content-center align-items-center">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onClick={(e) => e.stopPropagation()}
              checked={row.isChecked}
              onChange={() => handleCheck(row)}
            />
          </div>
        </div>
      </td>
      <td className="px-1 col">{row.text}</td>
      <td className="px-1 col-1">
        <Icons.Favorite
          isImportant={row.isImportant}
          onClick={(e: any) => handleToggleFavorite(e, row)}
        />
      </td>
    </tr>
  ));

  return tasks ? <>{elements}</> : null;
};

export const TasksRows = memo(TasksComponent);