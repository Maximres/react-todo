﻿import React, { useState } from "react";
import { Favorite, Options } from "../../utils/IconsComponent";
import { IRow, ITask } from "../../types/appTypes";
import { useAppDispatch, useAppSelector } from "../../data/hooks";
import selectCurrentRow from "../../data/selectors";
import {
  toggleChecked,
  toggleFavorite as toggleFavoriteTask,
  updateTask,
} from "../../data/appSlice";

const RowDetailsEditor = () => {
  const dispatch = useAppDispatch();
  const selectedRow = useAppSelector(selectCurrentRow) as IRow;
  const [newTaskFocused, setNewTaskFocus] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");

  const handleCheck = (task: IRow) => {
    dispatch(toggleChecked({ task: task, isChecked: !task.isChecked }));
  };

  const handleSubCheck = (subTask: ITask) => {
    const selectedSubTask = selectedRow.subTasks.find(
      (x) => x.id === subTask.id,
    ) as ITask;
    dispatch(
      updateTask({ ...selectedRow, isChecked: !selectedSubTask.isChecked }),
    );
  };

  const handleNewTaskCheck = (e: any) => {
    const task = { ...selectedRow };
    task.subTasks = [
      ...task.subTasks,
      {
        id: Math.random(),
        isChecked: false,
        text: newTaskValue,
        createdDate: Number(new Date())
      },
    ];
    dispatch(updateTask(task));
    setNewTaskFocus(false);
    setNewTaskValue("");
  };

  const handleTextChange = (e: any, task: ITask) => {
    dispatch(updateTask({ ...(task as IRow), text: e.target.value }));
  };

  const handleSubTextChange = (e: any, subTask: ITask) => {
    //todo: handle sub task
  };

  const toggleFavorite = () => {
    const row = selectedRow;
    dispatch(toggleFavoriteTask({ task: row, isFavorite: !row.isFavorite }));
  };

  const handleSubCheckOnEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      handleNewTaskCheck(e);
    }
  };

  const handleEnterKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="m-3">
      <ul className="list-group">
        <li className="list-group-item group-item-height d-flex justify-content-between align-items-center flex-fill">
          <input
            className="form-check-input me-3 p-2 flex-shrink-0"
            type="checkbox"
            checked={selectedRow.isChecked}
            onChange={() => handleCheck(selectedRow)}
          />
          <textarea
            rows={1}
            className="form-control me-1 overflow-hidden fw-bolder fs-4"
            value={selectedRow.text}
            onKeyPress={handleEnterKeyPress}
            onChange={(e) => handleTextChange(e, selectedRow)}
          />

          <Favorite
            onClick={() => toggleFavorite()}
            isFavorite={selectedRow.isFavorite}
          />
        </li>

        {selectedRow &&
          selectedRow.subTasks &&
          selectedRow.subTasks.map((subTask) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={subTask.id}
              >
                <input
                  className="form-check-input flex-shrink-0 me-3"
                  type="checkbox"
                  checked={subTask.isChecked}
                  onChange={() => handleSubCheck(subTask)}
                />
                <textarea
                  rows={1}
                  className={
                    "form-control me-1 overflow-hidden " +
                    (subTask.isChecked ? "text-decoration-line-through" : "")
                  }
                  value={subTask.text}
                  onKeyPress={handleEnterKeyPress}
                  onChange={(e) => handleSubTextChange(e, subTask)}
                />
                <div className="mx-2">
                  <Options />
                </div>
              </li>
            );
          })}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          {!newTaskFocused && !newTaskValue ? (
            <>
              <span className="me-3" id="add-task">
                +
              </span>
              <input
                className="form-control me-1"
                type="text"
                placeholder={"New step"}
                onFocus={() => setNewTaskFocus(true)}
              />
            </>
          ) : (
            <>
              <input
                className="form-check-input me-3 flex-shrink-0"
                type="checkbox"
                onChange={handleNewTaskCheck}
                aria-label="..."
              />
              <textarea
                rows={1}
                className="form-control me-4 overflow-hidden"
                autoFocus={newTaskFocused}
                onBlur={() => setNewTaskFocus(false)}
                value={newTaskValue}
                onKeyPress={handleSubCheckOnEnter}
                onChange={(e) => setNewTaskValue(e.target.value)}
                aria-label="..."
              />
            </>
          )}
        </li>
      </ul>
    </div>
  );
};

export default RowDetailsEditor;
