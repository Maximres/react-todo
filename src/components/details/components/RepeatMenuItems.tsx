import React from "react";
import reminderEnum from "../../../constants/enums/reminderEnum";
import Icons from "../../common/AppIcons";
import CustomRepeatIntervalPicker from "./CustomRepeatIntervalPicker";

type Props = {
  setReminder: (dateType: reminderEnum, value?: any) => void;
  closeDropdown: () => void;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

const RepeatMenuItems = ({
  setReminder,
  setIsOpen,
  isOpen,
  closeDropdown,
}: Props) => {
  const closeDropDownAndSetReminder = (reminderType: reminderEnum) => {
    closeDropdown();
    setReminder(reminderType);
  };

  return (
    <ul className="dropdown-menu" style={{ width: "300px" }}>
      {!isOpen && (
        <>
          <li
            className="dropdown-item pointer"
            onClick={() =>
              closeDropDownAndSetReminder(reminderEnum.REPEAT_DAILY)
            }
          >
            <div className="d-flex align-items-center">
              <span className="me-2">
                <Icons.Today />
              </span>
              <button type="button" className="border-0 bg-transparent">
                Daily
              </button>
            </div>
          </li>
          <li
            className="dropdown-item pointer"
            onClick={() =>
              closeDropDownAndSetReminder(reminderEnum.REPEAT_WEEKDAYS)
            }
          >
            <div className="d-flex align-items-center">
              <span className="me-2">
                <Icons.Weekdays />
              </span>
              <button type="button" className="border-0 bg-transparent">
                Weekday
              </button>
            </div>
          </li>
          <li
            className="dropdown-item pointer"
            onClick={() =>
              closeDropDownAndSetReminder(reminderEnum.REPEAT_WEEKLY)
            }
          >
            <div className="d-flex align-items-center">
              <span className="me-2">
                <Icons.Week />
              </span>
              <button type="button" className="border-0 bg-transparent">
                Weekly
              </button>
            </div>
          </li>
          <li
            className="dropdown-item pointer"
            onClick={() =>
              closeDropDownAndSetReminder(reminderEnum.REPEAT_MONTHLY)
            }
          >
            <div className="d-flex align-items-center">
              <span className="me-2">
                <Icons.Month />
              </span>
              <button type="button" className="border-0 bg-transparent">
                Monthly
              </button>
            </div>
          </li>
          <li
            className="dropdown-item pointer"
            onClick={() =>
              closeDropDownAndSetReminder(reminderEnum.REPEAT_YEARLY)
            }
          >
            <div className="d-flex align-items-center">
              <span className="me-2">
                <Icons.Year />
              </span>
              <button type="button" className="border-0 bg-transparent">
                Yearly
              </button>
            </div>
          </li>
          <li className="dropdown-item pointer" onClick={() => setIsOpen(true)}>
            <div className="d-flex align-items-center">
              <span className="me-2">
                <Icons.PickDate />
              </span>
              <button type="button" className="border-0 bg-transparent">
                Custom
              </button>
            </div>
          </li>
        </>
      )}

      {isOpen && (
        <li className="">
          <div className="d-flex align-items-center">
            <CustomRepeatIntervalPicker
              setIsOpen={setIsOpen}
              closeDropdown={closeDropdown}
              setReminder={setReminder}
            />
          </div>
        </li>
      )}
    </ul>
  );
};

export default RepeatMenuItems;
