import { ClickAwayListener, Paper, Popper } from "@mui/material";
import React from "react";
import { PopupState, bindPopover } from "material-ui-popup-state/core";
import { ReminderDatePicker } from "./ReminderDatePicker";

type Props = {
  reminder?: number;
  onAccept: (value?: number) => void;
  popupState: PopupState;
};

const ReminderDatePickerPopper = ({ reminder, popupState, onAccept }: Props) => {
  const handleClose = () => {
    popupState.close();
  };

  return (
    <Popper {...bindPopover(popupState)} placement="left" sx={{ zIndex: 100 }}>
      <ClickAwayListener onClickAway={handleClose} disableReactTree={true}>
        <Paper>
          <ReminderDatePicker reminder={reminder} onAccept={onAccept} handleClose={handleClose} />
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export { ReminderDatePickerPopper };
