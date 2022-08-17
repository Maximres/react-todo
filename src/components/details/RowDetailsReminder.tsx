import React, { useCallback, useMemo } from "react";
import ReminderEnum from "../../utils/ReminderEnum";
import ReminderInput from "./ReminderInput";
import ReminderDatePickerDropdown from "./ReminderGroupItem";
import DueDateInput from "./DueDateInput";
import RepeatInput from "./RepeatInput";
import ReminderIntervalPickerDropdown from "./ReminderIntervalPickerDropdown";

const RowDetailsReminder = () => {
  const ReminderInputComponent = useCallback((props: any) => {
    return <ReminderInput {...props} />;
  }, []);

  const DueDateInputComponent = useCallback((props: any) => {
    return <DueDateInput {...props} />;
  }, []);

  const RepeatInputComponent = useCallback((props: any) => {
    return <RepeatInput {...props} />;
  }, []);

  return (
    <div className="m-3">
      <div className="list-group">
        <div className="list-group-item group-item-height d-flex align-items-center py-0">
          <ReminderDatePickerDropdown
            datePickerProps={useMemo(
              () => ({
                showTimeInput: true,
                dateFormat: "h:mm aa",
                shouldCloseOnSelect: false,
                placeholderText: "Pick a date & time",
              }),
              [],
            )}
            customInput={ReminderInputComponent}
            dateTimeType={ReminderEnum.REMINDER}
          />
        </div>
        <div className="list-group-item group-item-height d-flex align-items-center py-0">
          <ReminderDatePickerDropdown
            datePickerProps={useMemo(
              () => ({
                shouldCloseOnSelect: false,
                placeholderText: "Pick a date",
              }),
              [],
            )}
            customInput={DueDateInputComponent}
            dateTimeType={ReminderEnum.DUE_DATE}
          />
        </div>
        <div className="list-group-item group-item-height d-flex align-items-center py-0">
          <ReminderIntervalPickerDropdown
            customInput={RepeatInputComponent}
            dateTimeType={ReminderEnum.REPEAT}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(RowDetailsReminder);
