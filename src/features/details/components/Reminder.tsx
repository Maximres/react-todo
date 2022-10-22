import React from "react";
import { Box, Divider, Paper } from "@mui/material";
import { ReminderInput } from "./reminder/ReminderInput";
import DueDateInput from "@/features/details/components/dueDate/DueDateInput";
import RepeatInput from "@/features/details/components/repeat/RepeatInput";

const Reminder = () => {
  return (
    <>
      <Box mx="1rem" my="0.5rem">
        <Paper variant="outlined">
          <ReminderInput />
          <Divider light={true} variant="middle" sx={{ width: 0.9 }} />
          <DueDateInput />
          <Divider light={true} variant="middle" sx={{ width: 0.9 }} />
          <RepeatInput />
        </Paper>
      </Box>
    </>
  );
};

export default Reminder;
