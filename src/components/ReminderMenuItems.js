import React from "react";
import ReminderEnum from "../utils/ReminderEnum";
import {Clock, ClockRotate, NextWeek, Tomorrow} from "../utils/IconsComponent";

const ReminderMenuItems = ({setReminder, openCalendar}) => {
    return <ul className="dropdown-menu" style={ {width: "300px"} }>
        <li className="dropdown-item pointer" onClick={ (e) => setReminder(ReminderEnum.LATER_TODAY) }>
            <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <ClockRotate/>
                                        </span>
                <button type="button" className="border-0 bg-transparent">Later today</button>
            </div>
        </li>
        <li className="dropdown-item pointer" onClick={ () => setReminder(ReminderEnum.TOMORROW) }>
            <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Tomorrow/>
                                        </span>
                <button type="button" className="border-0 bg-transparent">Tomorrow</button>

            </div>
        </li>
        <li className="dropdown-item pointer" onClick={ () => setReminder(ReminderEnum.NEXT_WEEK) }>
            <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <NextWeek/>
                                        </span>
                <button type="button" className="border-0 bg-transparent">Next week</button>
            </div>
        </li>
        <li>
            <hr className="dropdown-divider"/>
        </li>
        <li className="dropdown-item pointer" onClick={ () => openCalendar() }>
            <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Clock/>
                                        </span>
                <button type="button" className="border-0 bg-transparent">Pick a date & time</button>
            </div>
        </li>
    </ul>
}

export default ReminderMenuItems;