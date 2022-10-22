import React from "react";
import Icons from "@/components/AppIcons";
import { format } from "date-fns";
import useReminder from "../../ducks/hooks/useReminder";
import reminderEnum from "@/constants/enums/reminderEnum";
import { useAppSelector } from "@/constants/types/redux";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const ReminderField = () => {
  const selectedTask = useAppSelector(currentTaskSelector);
  const [setReminder, clearReminder] = useReminder();
  const hasReminder = selectedTask && selectedTask.remindDate;
  const pattern12AmPmFormat = "p";
  const weekMonthDayFormat = "iii, LLL d";
  const reminderText = hasReminder
    ? `Remind me at ${format(selectedTask.remindDate as number, pattern12AmPmFormat)}`
    : "Remind me";
  const reminderDetailedText = hasReminder
    ? format(selectedTask.remindDate as number, weekMonthDayFormat)
    : null;

  const handleClearReminder = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    clearReminder(reminderEnum.REMINDER);
  };

  const color = hasReminder ? "primary.main" : "text.secondary";
  return (
    // <div className="dropdown d-flex justify-content-between align-items-center" onClick={() => {}}>
    //   <div
    //     className=" d-flex justify-content-between align-items-center pointer flex-grow-1"
    //     data-bs-toggle="dropdown"
    //     ref={ref}
    //     aria-expanded="false"
    //   >
    //     <span className="me-3">
    //       <Icons.Reminder className={hasReminder ? "text-primary" : ""} />
    //     </span>
    //     <div className="form-control me-1 d-flex flex-column ">
    //       <span className={hasReminder ? "text-primary" : ""}>{reminderText}</span>
    //       {hasReminder && <span className="text-secondary">{reminderDetailedText}</span>}
    //     </div>
    //   </div>
    //   <ReminderMenuItems setReminder={setReminder} openCalendar={() => setIsOpen(true)} />
    //
    //   {hasReminder && (
    //     <button
    //       type="button"
    //       className="btn-close"
    //       aria-label="Close"
    //       onClick={handleClearReminder}
    //     />
    //   )}
    // </div>

    <Stack direction="row" sx={{ height: 50 }}>
      <Button variant="text" sx={{ flexGrow: 1, justifyContent: "start", p: 0 }}>
        <Box sx={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography textTransform="none" color={color} fontSize="medium">
            <Icons.Reminder />
          </Typography>
        </Box>
        <Stack direction="column">
          <Typography variant="body1" textTransform="none" color={color} align="left">
            {reminderText}
          </Typography>
          {hasReminder && (
            <Typography textTransform="none" color="text.secondary" fontSize="smaller" align="left">
              {reminderDetailedText}
            </Typography>
          )}
        </Stack>
      </Button>
      {hasReminder && (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mr: "0.5rem" }}>
          <IconButton onClick={handleClearReminder} size="small" sx={{ width: 40 }}>
            <Icons.Close />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};

export default ReminderField;
