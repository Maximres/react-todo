import React, { forwardRef } from "react";
import { Reminder } from "../../utils/IconsComponent";
import ReminderMenuItems from "./ReminderMenuItems";
import { format } from "date-fns";
import useReminder from "../../hooks/useReminder";
import ReminderEnum from "../../utils/ReminderEnum";
import { useAppSelector } from "../../data/hooks";
import selectCurrentRow from "../../data/selectors";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const ReminderInput = forwardRef(
  ({ isOpen, setIsOpen }: Props, ref: React.Ref<HTMLDivElement>) => {
    const selectedTask = useAppSelector(selectCurrentRow);
    const [setReminder, clearReminder] = useReminder();
    const hasReminder = selectedTask && selectedTask.remindDate;
    const pattern12AmPmFormat = "p";
    const weekMonthDayFormat = "iii, LLL d";
    const reminderText = hasReminder
      ? `Remind me at ${format(
          selectedTask.remindDate as number,
          pattern12AmPmFormat,
        )}`
      : "Remind me";
    const reminderDetailedText = hasReminder
      ? format(selectedTask.remindDate as number, weekMonthDayFormat)
      : null;

    const handleClearReminder = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      clearReminder(ReminderEnum.REMINDER);
    };

    return (
      <div
        className="dropdown d-flex justify-content-between align-items-center"
        onClick={() => {}}
      >
        <div
          className=" d-flex justify-content-between align-items-center pointer flex-grow-1"
          data-bs-toggle="dropdown"
          ref={ref}
          aria-expanded="false"
        >
          <span className="me-3">
            <Reminder className={hasReminder ? "text-primary" : ""} />
          </span>
          <div className="form-control me-1 d-flex flex-column ">
            <span className={hasReminder ? "text-primary" : ""}>
              {reminderText}
            </span>
            {hasReminder && (
              <span className="text-secondary">{reminderDetailedText}</span>
            )}
          </div>
        </div>
        <ReminderMenuItems
          setReminder={setReminder}
          openCalendar={() => setIsOpen(true)}
        />

        {hasReminder && (
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={handleClearReminder}
          />
        )}
      </div>
    );
  },
);

export default ReminderInput;
