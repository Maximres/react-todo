import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, StaticDateTimePicker } from "@mui/x-date-pickers";
import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { set, toDate } from "date-fns";
import { PickersActionBarProps } from "@mui/x-date-pickers/PickersActionBar";
import { useLocaleText, WrapperVariantContext } from "@mui/x-date-pickers/internals";

type Props = {
  onAccept: (value?: number) => void;
  handleClose: () => void;
  reminder?: number;
};

const ReminderDatePicker = ({ reminder, onAccept, handleClose }: Props) => {
  const date7AM = set(new Date(), { hours: 7, minutes: 0, seconds: 0, milliseconds: 0 });
  const [value, setValue] = React.useState<Date | null>(toDate(reminder ?? date7AM));

  const CustomActionBar = (props: PickersActionBarProps) => {
    const wrapperVariant = React.useContext(WrapperVariantContext);
    const localeText = useLocaleText();
    const { onAccept, onClear, onCancel, onSetToday, actions } = props;
    const actionsArray = typeof actions === "function" ? actions(wrapperVariant) : actions;

    if (actionsArray == null || actionsArray.length === 0) {
      return null;
    }

    const menuItems = actionsArray?.map((actionType) => {
      switch (actionType) {
        case "clear":
          return (
            <Button
              onClick={() => {
                onClear();
              }}
              key={actionType}
            >
              {localeText.clearButtonLabel}
            </Button>
          );
        case "cancel":
          return (
            <Button
              onClick={() => {
                onCancel();
                handleClose();
              }}
              key={actionType}
            >
              {localeText.cancelButtonLabel}
            </Button>
          );
        case "accept":
          return (
            <Button
              onClick={() => {
                onAccept();
                handleClose();
              }}
              key={actionType}
            >
              {localeText.okButtonLabel}
            </Button>
          );
        default:
          return null;
      }
    });

    return (
      <Stack direction="row" justifyContent="end">
        {menuItems}
      </Stack>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDateTimePicker
        displayStaticWrapperAs="mobile"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        hideTabs={true}
        ampm={false}
        renderInput={(params) => <TextField {...params} />}
        onAccept={(val) => {
          onAccept(Number(val));
        }}
        components={{
          ActionBar: CustomActionBar,
        }}
        componentsProps={{
          actionBar: {
            actions: ["cancel", "accept"],
          },
        }}
      />
    </LocalizationProvider>
  );
};

export { ReminderDatePicker };
