import React, { memo, useEffect, useState } from "react";
import { handleEnterKeyPress } from "@/utils/helpers/enterKeyHandler";
import { useDebouncedCallback } from "use-debounce";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { updateTask } from "@features/tasks";
import { ITask } from "@/constants/types/tasksTypes";

const RowNoteTextArea = memo(() => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector((s) => s.details.task) as ITask;

  const [note, setNote] = useState(selectedTask.note);
  const debounceUpdate = useDebouncedCallback(() => {
    dispatch(updateTask({ id: selectedTask.id, note } as ITask));
  }, 1000);

  useEffect(() => {
    return () => {
      debounceUpdate.flush();
    };
  }, []);

  useEffect(() => {
    debounceUpdate();
  }, [note]);

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
            onChange={(e) => {
              setNote(e.target.value);
            }}
            aria-label="Add note area"
          />
        </label>
      </div>
    </div>
  );
});

RowNoteTextArea.displayName = "RowNoteTextArea";

export { RowNoteTextArea };
