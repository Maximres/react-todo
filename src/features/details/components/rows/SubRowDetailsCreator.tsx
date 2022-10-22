import React, { useState } from "react";
import { createSubTask } from "@features/tasks";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";
import { ITask } from "@/constants/types/tasksTypes";
import { Box, Checkbox, IconButton, InputBase, Stack } from "@mui/material";
import Icons from "@/components/AppIcons";

const SubRowDetailsCreator = () => {
  const dispatch = useAppDispatch();
  const selectedRow = useAppSelector(currentTaskSelector) as ITask;

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

  const isNotInTarget = !newTaskFocused && !newTaskValue;
  return (
    <Stack direction="row" sx={{ height: 40 }}>
      <Box sx={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isNotInTarget ? (
          <IconButton size="small" sx={{ flexGrow: 1 }}>
            <Icons.Plus />
          </IconButton>
        ) : (
          <Checkbox size="small" checked={false} onChange={handleNewTaskCheck} />
        )}
      </Box>

      <InputBase
        sx={{ flexGrow: 1 }}
        value={newTaskValue}
        autoFocus={newTaskFocused}
        onBlur={() => setNewTaskFocus(false)}
        onFocus={() => setNewTaskFocus(true)}
        onChange={(e) => setNewTaskValue(e.target.value)}
        onKeyPress={handleSubCheckOnEnter}
        placeholder={isNotInTarget ? "Next step" : ""}
      />
    </Stack>
  );
};

export default SubRowDetailsCreator;
