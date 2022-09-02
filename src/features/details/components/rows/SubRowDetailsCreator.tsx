import React, { useState } from "react";
import { createSubTask } from "@features/tasks";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { selectCurrentTask } from "@/utils/selectors/selectCurrentRow";
import { IRow } from "@/constants/types/tasksTypes";

const SubRowDetailsCreator = () => {
  const dispatch = useAppDispatch();
  const selectedRow = useAppSelector(selectCurrentTask) as IRow;

  const [newTaskFocused, setNewTaskFocus] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");
  const handleNewTaskCheck = (e: any) => {
    dispatch(createSubTask(selectedRow.id, newTaskValue));
    setNewTaskFocus(false);
    setNewTaskValue("");
  };

  const handleSubCheckOnEnter = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
      handleNewTaskCheck(e);
    }
  };

  return (
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
  );
};

export default SubRowDetailsCreator;
