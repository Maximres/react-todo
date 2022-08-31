import React, { useMemo, useState } from "react";
import Icons from "@/components/AppIcons";
import { createTask } from "@/features/tasks";
import { useAppDispatch } from "@/constants/types/redux";

const EditTaskForm = () => {
  const dispatch = useAppDispatch();

  const [isFocused, setFocused] = useState(false);
  const [newTaskText, setNewTaskText] = useState("");

  const handleNewTaskSubmit = (e: any) => {
    e.preventDefault();
    if (!newTaskText) return;

    dispatch(createTask(newTaskText));
    setNewTaskText("");
  };

  const toggleFocus = () => {
    setFocused(!isFocused);
  };

  const addNewTask = useMemo(
    () => (
      <span className="input-group-text" id="add-task">
        <Icons.Plus />
      </span>
    ),
    [],
  );

  const handleNewTask = (
    <>
      <div className="input-group-text">
        <input
          className="form-check-input"
          value=""
          type="radio"
          onChange={handleNewTaskSubmit}
        />
      </div>
    </>
  );
  return (
    <div className="row position-absolute input-text-inline-position bottom-0 py-3 pb-4 bg-light bg-opacity-75">
      <form onSubmit={handleNewTaskSubmit}>
        <div className="input-group flex-nowrap input-group-pad">
          {isFocused || !!newTaskText ? handleNewTask : addNewTask}
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
  );
};

export { EditTaskForm };
