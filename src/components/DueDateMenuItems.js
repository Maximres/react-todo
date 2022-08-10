import React from "react";
import ReminderEnum from "../utils/ReminderEnum";
import {NextWeek, PickDate, Today, Tomorrow} from "../utils/IconsComponent";

const DueDateMenuItems = ({setReminder, openCalendar}) => {
    return <ul className="dropdown-menu" style={ {width: "300px"} }>
        <li className="dropdown-item pointer" onClick={ (e) => setReminder(ReminderEnum.DUE_TODAY) }>
            <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Today/>
                                        </span>
                <button type="button" className="border-0 bg-transparent">Today</button>
            </div>
        </li>
        <li className="dropdown-item pointer" onClick={ () => setReminder(ReminderEnum.DUE_TOMORROW) }>
            <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Tomorrow/>
                                        </span>
                <button type="button" className="border-0 bg-transparent">Tomorrow</button>

            </div>
        </li>
        <li className="dropdown-item pointer" onClick={ () => setReminder(ReminderEnum.DUE_NEXT_WEEK) }>
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
        <li className="dropdown-item pointer" onClick={() => openCalendar()}>
            <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <PickDate/>
                                        </span>
                <button type="button" className="border-0 bg-transparent">Pick a date</button>
            </div>
        </li>
    </ul>
}

export default DueDateMenuItems;