import React from "react";
import {useCallback, useContext, useEffect, useId, useRef, useState} from "react";
import {AppContext} from "../contexts/AppContext";
import DatePicker from "react-datepicker";
import DateTimeEnum from "../utils/DateTimeEnum";
import {add, set} from "date-fns";
import {Types} from "../App";
import DatePickerContainer from "./DatePickerContainer";

const ReminderDropdown = ({datePickerProps, customInput, dateTimeType}) => {

    const ctx = useContext(AppContext);
    const id = useId();
    const [customDate, setCustomDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const selectedTask = ctx.selectedRow;
    const datePickerRef = useRef();
    const dropdownRef = useRef();

    useEffect(() => {
        datePickerRef.current.setOpen(isOpen);
    }, [isOpen])

    const CalendarContainer = useCallback((props) => {
        return <DatePickerContainer { ...props } date={ customDate } dateTimeType={dateTimeType} closeCalendar={ () => {
            setIsOpen(false)
        } }/>
    }, [])

    return <DatePicker className="border-0 bg-transparent"
                       { ...datePickerProps }
                       selected={ customDate }
                       disabled={ !isOpen }
                       onChange={ (date) => setCustomDate(date) }
                       onCalendarClose={ () => setIsOpen(false) }
                       ref={ datePickerRef }
                       customInputRef="inputRef"
                       inputRef={ dropdownRef }
                       customInput={ customInput({
                           isOpen: isOpen,
                           setIsOpen: setIsOpen,
                           date: customDate,
                           id: id,
                           ref: dropdownRef
                       }) }
                       calendarContainer={ CalendarContainer }/>
}
export default ReminderDropdown;