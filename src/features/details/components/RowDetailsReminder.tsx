import React, { useMemo } from "react";
import reminderEnum from "constants/enums/reminderEnum";
import ReminderInput from "./reminder/ReminderInput";
import ReminderDatePickerDropdown from "./common/ReminderGroupItem";
import DueDateInput from "./dueDate/DueDateInput";
import RepeatInput from "./repeat/RepeatInput";
import ReminderIntervalPickerDropdown from "./reminder/ReminderIntervalPickerDropdown";

const RowDetailsReminder = () => {
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
            CustomInput={ReminderInput}
            dateTimeType={reminderEnum.REMINDER}
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
            CustomInput={DueDateInput}
            dateTimeType={reminderEnum.DUE_DATE}
          />
        </div>
        <div className="list-group-item group-item-height d-flex align-items-center py-0">
          <ReminderIntervalPickerDropdown
            CustomInput={RepeatInput}
            dateTimeType={reminderEnum.REPEAT}
          />
        </div>
      </div>
    </div>
  );
};

export default RowDetailsReminder;
