import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { updateTask } from "@features/tasks";
import { ITask } from "@/constants/types/tasksTypes";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";
import { Paper, TextField, Box } from "@mui/material";

const Note = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(currentTaskSelector) as ITask;
  const [note, setNote] = useState(selectedTask.note);

  useEffect(() => {
    setNote(selectedTask.note);
  }, [selectedTask]);

  const onChangeCallback = (e: any) => {
    setNote(e.target.value);
    dispatch(updateTask({ id: selectedTask.id, task: { note: e.target.value } }));
  };

  return (
    <Box mx="1rem" my="0.5rem">
      <Paper elevation={0}>
        <TextField
          value={note}
          onChange={onChangeCallback}
          multiline={true}
          minRows={3}
          placeholder="Add note"
          fullWidth={true}
        />
      </Paper>
    </Box>
  );
};

Note.displayName = "Note";

export { Note };
