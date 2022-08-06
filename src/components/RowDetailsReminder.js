import {Calendar, CalendarRepeat, Clock, ClockRotate, NextWeek, Reminder, Tomorrow} from "../utils/IconsComponent";
import React from "@types/react";
import {useContext, useId, useState} from "react";
import {AppContext} from "../contexts/AppContext";
import DateTimeEnum from "../utils/DateTimeEnum";
import {Types} from "../App";
import {add, set} from "date-fns"

const RowDetailsReminder = () => {
    const ctx = useContext(AppContext);
    const id = useId()
    const [customDate, setCustomDate] = useState(new Date());
    const selectedTask = ctx.state.selectedRow;

    const setReminder = (dateType) => {
        const today = new Date();
        let taskCopy;
        switch (dateType) {
            case DateTimeEnum.LATER_TODAY:{
                const fourHoursByNow = set(add(today, {hours: 4}), {minutes: 0, seconds: 0, milliseconds : 0});
                taskCopy = {...selectedTask, remindDate: fourHoursByNow};
                break;
            }
            case DateTimeEnum.TOMORROW: {
                const tomorrow = set(add(today, {days: 1}), {hours: 9, minutes: 0, seconds: 0, milliseconds : 0});
                taskCopy = {...selectedTask, remindDate: tomorrow};
                break;
            }
            case DateTimeEnum.NEXT_WEEK:{
                const week = 7;
                const nextWeek = set(add(today, {days: week}), {hours: 9, minutes: 0, seconds: 0, milliseconds : 0});
                taskCopy = {...selectedTask, remindDate: nextWeek};
                break;
            }
            case DateTimeEnum.CUSTOM:
                //todo
                break;
        }
        ctx.dispatch({type: Types.UPDATE_TASK, payload: taskCopy})
    }

    return (<div className="m-3">
        <div className="list-group ">

            <label className="list-group-item dropdown">
                <div className="d-flex justify-content-between align-items-center pointer"
                     id={id}
                     data-bs-toggle="dropdown"
                     aria-expanded="false">
                                      <span className="me-3">
                                            <Reminder onClick={() => { }}/>
                                     </span>
                    <span className="form-control me-1"
                          onFocus={() => ({})}>Remind me
                                    </span>
                </div>

                <ul className="dropdown-menu" style={{width: "300px"}} aria-labelledby={id}>
                    <li className="dropdown-item">
                        <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <ClockRotate onClick={() => setReminder(DateTimeEnum.LATER_TODAY)}/>
                                        </span>
                            <button type="button" className="border-0 bg-transparent" >Later today</button>
                        </div>
                    </li>
                    <li className="dropdown-item">
                        <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Tomorrow onClick={() => setReminder(DateTimeEnum.TOMORROW)}/>
                                        </span>
                            <button type="button" className="border-0 bg-transparent" >Tomorrow</button>

                        </div>
                    </li>
                    <li className="dropdown-item">
                        <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <NextWeek onClick={() => setReminder(DateTimeEnum.NEXT_WEEK)} />
                                        </span>
                            <button type="button" className="border-0 bg-transparent" >Next week</button>

                        </div>
                    </li>
                    <li><hr className="dropdown-divider"/></li>
                    <li className="dropdown-item">
                        <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Clock onClick={() => setReminder(DateTimeEnum.CUSTOM)} />
                                        </span>
                            <button type="button" className="border-0 bg-transparent" >Pick a date & time</button>
                        </div>
                    </li>
                </ul>

            </label>
            <label className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="me-3">
                                <Calendar onClick={() => {
                                }}/>
                            </span>
                <span className="form-control me-1" type="text" onFocus={() => ({})}>Add due date</span>
            </label>
            <label className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="me-3">
                                <CalendarRepeat onClick={() => {
                                }}/>
                            </span>
                <span className="form-control me-1" type="text" onFocus={() => ({})}>Repeat</span>
            </label>
        </div>
    </div>)
}

