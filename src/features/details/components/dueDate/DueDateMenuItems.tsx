import React from "react";
import reminderEnum from "@/constants/enums/reminderEnum";
import Icons from "@/components/AppIcons";

type Props = {
  setReminder: (dateType: reminderEnum, value?: any) => void;
  openCalendar: () => void;
};

const DueDateMenuItems = ({ setReminder, openCalendar }: Props) => {
  return (
    <ul className="dropdown-menu" style={{ width: "300px" }}>
      <li
        className="dropdown-item pointer"
        onClick={(e) => setReminder(reminderEnum.DUE_TODAY)}
      >
        <div className="d-flex align-items-center">
          <span className="me-2">
            <Icons.Today />
          </span>
          <button type="button" className="border-0 bg-transparent">
            Today
          </button>
        </div>
      </li>
      <li
        className="dropdown-item pointer"
        onClick={() => setReminder(reminderEnum.DUE_TOMORROW)}
      >
        <div className="d-flex align-items-center">
          <span className="me-2">
            <Icons.Tomorrow />
          </span>
          <button type="button" className="border-0 bg-transparent">
            Tomorrow
          </button>
        </div>
      </li>
      <li
        className="dropdown-item pointer"
        onClick={() => setReminder(reminderEnum.DUE_NEXT_WEEK)}
      >
        <div className="d-flex align-items-center">
          <span className="me-2">
            <Icons.NextWeek />
          </span>
          <button type="button" className="border-0 bg-transparent">
            Next week
          </button>
        </div>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <li className="dropdown-item pointer" onClick={() => openCalendar()}>
        <div className="d-flex align-items-center">
          <span className="me-2">
            <Icons.PickDate />
          </span>
          <button type="button" className="border-0 bg-transparent">
            Pick a date
          </button>
        </div>
      </li>
    </ul>
  );
};

export default DueDateMenuItems;
