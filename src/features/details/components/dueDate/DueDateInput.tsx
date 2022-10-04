import React, { forwardRef } from "react";
import Icons from "@/components/AppIcons";
import DueDateMenuItems from "./DueDateMenuItems";
import { differenceInCalendarDays, format } from "date-fns";
import reminderEnum from "@/constants/enums/reminderEnum";
import useReminder from "../../ducks/hooks/useReminder";
import { useAppSelector } from "@/constants/types/redux";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";
import { formatDueDateValue } from "@/utils/helpers/formatDueDateValue";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const DueDateInput = forwardRef(
  ({ isOpen, setIsOpen }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
    const selectedTask = useAppSelector(currentTaskSelector);
    const [setReminder, clearReminder] = useReminder();

    const hasDueDate = selectedTask && selectedTask.dueDate;
    const date = formatDueDateValue(selectedTask?.dueDate);

    const dueDateText = date ? `Due ${date}` : "Add due date";

    const handleClearReminder = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      clearReminder(reminderEnum.DUE_DATE);
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
            <Icons.Calendar className={hasDueDate ? "text-primary" : ""} />
          </span>
          <div className="form-control me-1 d-flex flex-column ">
            <span className={hasDueDate ? "text-primary" : ""}>{dueDateText}</span>
          </div>
        </div>
        <DueDateMenuItems setReminder={setReminder} openCalendar={() => setIsOpen(true)} />

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
