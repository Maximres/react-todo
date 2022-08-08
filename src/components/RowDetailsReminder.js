import {CalendarRepeat} from "../utils/IconsComponent";
import React, {forwardRef, useCallback, useEffect, useMemo, useRef} from "react";
import DateTimeEnum from "../utils/DateTimeEnum";
import ReminderInput from "./ReminderInput";
import ReminderDropdown from "./ReminderGroupItem";
import DueDateInput from "./DueDateInput";

const RowDetailsReminder = () => {

    const ReminderInputComponent = useCallback((props) => {
        return <ReminderInput { ...props }/>
    }, [])

    const DueDateInputComponent = useCallback((props) => {
        return <DueDateInput { ...props }/>
    }, [])

    return (<div className="m-3">
        <div className="list-group ">
            <div className="list-group-item ">

                <ReminderDropdown
                    datePickerProps={ useMemo(() => ({
                        showTimeInput: true,
                        dateFormat: "h:mm aa",
                        shouldCloseOnSelect: false,
                        placeholderText: "Pick a date & time"
                    }), []) }
                    customInput={ ReminderInputComponent }
                    dateTimeType={ DateTimeEnum.REMINDER }
                />

            </div>
            <div className="list-group-item ">
                <ReminderDropdown
                    datePickerProps={ useMemo(() => ({
                        shouldCloseOnSelect: false,
                        placeholderText: "Pick a date"
                    }), []) }
                    customInput={ DueDateInputComponent }
                    dateTimeType={ DateTimeEnum.DUE_DATE }
                />
            </div>
            <div className="list-group-item d-flex justify-content-between align-items-center dropdown-item-height">
                            <span className="me-3">
                                <CalendarRepeat onClick={ () => {
                                } }/>
                            </span>
                <span className="form-control me-1" type="text" onFocus={ () => ({}) }>Repeat</span>

            </div>
        </div>
    </div>)
}

export default React.memo(RowDetailsReminder);