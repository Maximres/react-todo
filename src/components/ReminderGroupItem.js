import React from "react";
import {useCallback, useEffect, useId, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import DatePickerContainer from "./DatePickerContainer";

const ReminderDatePickerDropdown = ({datePickerProps, customInput, dateTimeType}) => {
    const id = useId();
    const [customDate, setCustomDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
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
export default ReminderDatePickerDropdown;