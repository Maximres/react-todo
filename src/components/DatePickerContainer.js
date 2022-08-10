import React from "react";
import ReminderEnum from "../utils/ReminderEnum";
import {CalendarContainer} from "react-datepicker/dist"
import useReminder from "../hooks/useReminder";

const DatePickerContainer = ({className, children, closeCalendar, date, dateTimeType}) => {
    const [setReminder] = useReminder()
    return <CalendarContainer className={ className }>
        <div>
            <div>
                { children }
            </div>
            <div>
                    <span>
                        <button type="button" onClick={ () => {
                            closeCalendar(false);
                        } } className="btn btn-secondary btn-sm px-4 m-2 float-start">Cancel</button>
                        <button type="button" onClick={ () => {
                            setReminder(dateTimeType, date);
                            closeCalendar(false);
                        } } className="btn btn-primary btn-sm px-4 m-2 float-end">Save</button>
                    </span>
            </div>
        </div>
    </CalendarContainer>
}

export default DatePickerContainer;
