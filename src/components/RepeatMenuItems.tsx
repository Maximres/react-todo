import React from "react";
import ReminderEnum from "../utils/ReminderEnum";
import {Month, NextWeek, PickDate, Today, Tomorrow, Week, Weekdays, Year} from "../utils/IconsComponent";
import CustomRepeatIntervalPicker from "./CustomRepeatIntervalPicker";

type Props = {
    setReminder: (dateType: ReminderEnum, value?: any) => void,
    closeDropdown: () => void
    isOpen: boolean,
    setIsOpen: (arg: boolean) => void
}

const RepeatMenuItems = ({setReminder, setIsOpen, isOpen, closeDropdown}: Props) => {
    const closeDropDownAndSetReminder = (reminderType: ReminderEnum) => {
        closeDropdown();
        setReminder(reminderType);
    }

    return <ul className="dropdown-menu" style={ {width: "300px"} }>

        { !isOpen && <>
            <li className="dropdown-item pointer"
                onClick={ () => closeDropDownAndSetReminder(ReminderEnum.REPEAT_DAILY) }>
                <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Today/>
                                        </span>
                    <button type="button" className="border-0 bg-transparent">Daily</button>
                </div>
            </li>
            <li className="dropdown-item pointer" onClick={ () => closeDropDownAndSetReminder(ReminderEnum.REPEAT_WEEKDAYS) }>
                <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Weekdays/>
                                        </span>
                    <button type="button" className="border-0 bg-transparent">Weekday</button>

                </div>
            </li>
            <li className="dropdown-item pointer" onClick={ () => closeDropDownAndSetReminder(ReminderEnum.REPEAT_WEEKLY) }>
                <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Week/>
                                        </span>
                    <button type="button" className="border-0 bg-transparent">Weekly</button>
                </div>
            </li>
            <li className="dropdown-item pointer" onClick={ () => closeDropDownAndSetReminder(ReminderEnum.REPEAT_MONTHLY) }>
                <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Month/>
                                        </span>
                    <button type="button" className="border-0 bg-transparent">Monthly</button>
                </div>
            </li>
            <li className="dropdown-item pointer" onClick={ () => closeDropDownAndSetReminder(ReminderEnum.REPEAT_YEARLY) }>
                <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Year/>
                                        </span>
                    <button type="button" className="border-0 bg-transparent">Yearly</button>
                </div>
            </li>
            <li className="dropdown-item pointer" onClick={ () => setIsOpen(true) }>
                <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <PickDate/>
                                        </span>
                    <button type="button" className="border-0 bg-transparent">Custom</button>
                </div>
            </li>
        </> }

        { isOpen && <li className="">
            <div className="d-flex align-items-center">
                <CustomRepeatIntervalPicker setIsOpen={setIsOpen} closeDropdown={closeDropdown} setReminder={setReminder}/>
            </div>
        </li> }

    </ul>
}

export default RepeatMenuItems;