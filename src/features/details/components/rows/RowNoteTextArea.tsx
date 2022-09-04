import React, { useEffect, useState } from "react";
import { handleEnterKeyPress } from "@/utils/helpers/enterKeyHandler";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { updateTask } from "@features/tasks";
import { ITask } from "@/constants/types/tasksTypes";
import { selectCurrentTask } from "@/utils/selectors/selectCurrentRow";

const RowNoteTextArea = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(selectCurrentTask) as ITask;
  const [note, setNote] = useState(selectedTask.note);

  useEffect(() => {
    setNote(selectedTask.note);
  }, [selectedTask]);

  const onChangeCallback = (e: any) => {
    setNote(e.target.value);
    dispatch(
      updateTask({ id: selectedTask.id, note: e.target.value } as ITask),
    );
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

RowNoteTextArea.displayName = "RowNoteTextArea";

export { RowNoteTextArea };
