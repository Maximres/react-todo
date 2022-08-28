import React, { useState } from "react";
import { Tasks } from "./components/Tasks";
import { IRow } from "../../constants/types/tasksTypes";
import { useAppDispatch, useAppSelector } from "../../constants/types/redux";
import Icons from "../../components/AppIcons";
import {
  createTask,
  toggleChecked,
  toggleFavorite as toggleFavoriteTask,
} from "./mainSlice";

const Main = () => {
  const [isFocused, setFocused] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const tasks = useAppSelector((s) => s.main.tasks);
  const dispatch = useAppDispatch();

  const toggleFocus = () => {
    setFocused(!isFocused);
  };

  const handleNewTaskSubmit = (e: any) => {
    e.preventDefault();
    if (!newTaskText) return;

    dispatch(createTask(newTaskText));
    setNewTaskText("");
  };

  const handleCheck = (task: IRow) => {
    dispatch(toggleChecked({ task: task, isChecked: !task.isChecked }));
  };

  const toggleFavorite = (task: IRow) => {
    dispatch(toggleFavoriteTask({ task: task, isImportant: !task.isImportant }));
  };

  const renderRows = (tasks: IRow[]) => {
    return (
      <Tasks
        tasks={tasks}
        handleCheck={handleCheck}
        toggleFavorite={toggleFavorite}
      />
    );
  };

  return (
    <main
      className="bg-white flex-fill position-relative"
      style={{ minWidth: 350 }}
    >
      <div className="container-fluid my-5 overflow-auto vh-100">
        <div className="row px-5">
          <div className="col-12">
            <table className="table table-striped table-hover col-12">
              <tbody>{renderRows(tasks.filter((x) => !x.isChecked))}</tbody>
            </table>
            <table className="table table-striped table-hover table-secondary">
              <tbody>{renderRows(tasks.filter((x) => x.isChecked))}</tbody>
            </table>
          </div>
        </div>
        <div className="row position-absolute input-text-inline-position bottom-0 py-3 pb-4 bg-light bg-opacity-75">
          <form onSubmit={handleNewTaskSubmit}>
            <div className="input-group flex-nowrap input-group-pad">
              {isFocused || !!newTaskText ? (
                <div className="input-group-text">
                  <input
                    className="form-check-input"
                    value=""
                    type="radio"
                    onChange={handleNewTaskSubmit}
                  />
                </div>
              ) : (
                <span className="input-group-text" id="add-task">
                  <Icons.Plus />
                </span>
              )}
              <input
                onFocus={toggleFocus}
                onBlur={toggleFocus}
                value={newTaskText}
                onChange={(e: any) => {
                  setNewTaskText(e.target.value);
                }}
                className="form-control"
                type="text"
                placeholder="Add a task"
                aria-describedby="add-task"
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export { Main };
