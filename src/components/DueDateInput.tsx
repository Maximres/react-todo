﻿import React, { forwardRef } from "react";
import { Calendar } from "../utils/IconsComponent";
import DueDateMenuItems from "./DueDateMenuItems";
import { differenceInCalendarDays, format } from "date-fns";
import ReminderEnum from "../utils/ReminderEnum";
import useReminder from "../hooks/useReminder";
import useAppContext from "../hooks/useAppContext";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const DueDateInput = forwardRef(
  ({ isOpen, setIsOpen }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const ctx = useAppContext();
    const [setReminder, clearReminder] = useReminder();
    const selectedTask = ctx.selectedRow;
    const weeks = "EEEE";
    const weekMonthDayFormat = "iii, LLL d";
    const hasDueDate = selectedTask && selectedTask.dueDate;
    let date;
    if (hasDueDate) {
      const dueDateValue = selectedTask.dueDate as Date;
      const diffDays = differenceInCalendarDays(dueDateValue, new Date());

      const isToday = diffDays === 0;
      const isTomorrow = diffDays === 1;
      const nextWeekOrGreater = diffDays > 1;
      date = isToday
        ? "Today"
        : isTomorrow
        ? "Tomorrow"
        : hasDueDate &&
          format(dueDateValue, nextWeekOrGreater ? weekMonthDayFormat : weeks);
    }

    const dueDateText = hasDueDate ? `Due ${date}` : "Add due date";

    const handleClearReminder = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      clearReminder(ReminderEnum.DUE_DATE);
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
            <Calendar className={hasDueDate ? "text-primary" : ""} />
          </span>
          <div className="form-control me-1 d-flex flex-column ">
            <span className={hasDueDate ? "text-primary" : ""}>
              {dueDateText}
            </span>
          </div>
        </div>
        <DueDateMenuItems
          setReminder={setReminder}
          openCalendar={() => setIsOpen(true)}
        />

        {hasDueDate && (
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

export default DueDateInput;
