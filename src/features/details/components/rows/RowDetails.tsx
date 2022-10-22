import React from "react";
import Icons from "@/components/AppIcons";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";
import { ISubTask, ITask } from "@/constants/types/tasksTypes";
import { toggleChecked, updateTask } from "@/features/tasks";
import { Box, Checkbox, IconButton, InputBase, Stack } from "@mui/material";

const RowDetails = () => {
  const selectedRow = useAppSelector(currentTaskSelector);
  const dispatch = useAppDispatch();

  const handleCheck = (task: ITask) => {
    dispatch(toggleChecked({ task: task, isChecked: !task.isChecked }));
  };

  const handleTextChange = (e: any, task: ISubTask) => {
    dispatch(
      updateTask({
        id: task.id,
        task: {
          text: e.target.value,
        },
      }),
    );
  };

  const toggleFavoriteTask = () => {
    const row = selectedRow!;
    dispatch(
      updateTask({
        id: row.id,
        task: {
          isImportant: !row.isImportant,
        },
      }),
    );
  };

  if (selectedRow == null) return null;

  return (
    <Stack direction="row" sx={{ height: 50 }}>
      <Box sx={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Checkbox checked={selectedRow.isChecked} onChange={() => handleCheck(selectedRow)} />
      </Box>
      <InputBase
        sx={{ flexGrow: 1 }}
        inputProps={{
          style: {
            fontSize: "1.5rem",
            fontWeight: 500,
          },
        }}
        value={selectedRow.text}
        onChange={(e) => handleTextChange(e, selectedRow)}
      />
      <Box sx={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconButton size="small" sx={{ flexGrow: 1 }} onClick={() => toggleFavoriteTask()}>
          <Icons.Favorite isImportant={selectedRow.isImportant} />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default RowDetails;
