import React, { useEffect, useState } from "react";
import { handleEnterKeyPress } from "@/utils/helpers/enterKeyHandler";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { updateTask } from "@features/tasks";
import { ITask } from "@/constants/types/tasksTypes";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";

const Note = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(currentTaskSelector) as ITask;
  const [note, setNote] = useState(selectedTask.note);

  useEffect(() => {
    setNote(selectedTask.note);
  }, [selectedTask]);

  const onChangeCallback = (e: any) => {
    setNote(e.target.value);
    dispatch(updateTask({ id: selectedTask.id, task: { note: e.target.value }  }));
  };

  return (
    <div className="m-3">
      <div className="list-group ">
        <label className="list-group-item group-item-height d-flex justify-content-between align-items-center">
          <textarea
            rows={3}
            className="form-control overflow-hidden"
            placeholder="Add note"
            onKeyPress={handleEnterKeyPress}
            value={note}
            onChange={onChangeCallback}
            aria-label="Add note area"
          />
        </label>
      </div>
    </div>
  );
};

Note.displayName = "Note";

export { Note };
