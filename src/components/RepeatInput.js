import React, {useCallback} from "react"
import {Calendar, CalendarRepeat} from "../utils/IconsComponent";
import {forwardRef} from "react";
import ReminderEnum from "../utils/ReminderEnum";
import useReminder from "../hooks/useReminder";
import RepeatMenuItems from "./RepeatMenuItems";
import RepeatDisplayNameHelper from "../utils/RepeatDisplayNameHelper";
import useAppContext from "../contexts/UseAppContext";
import {Dropdown} from "bootstrap/dist/js/bootstrap.esm"


const RepeatInput = forwardRef(({isOpen, setIsOpen}, ref) => {
    const ctx = useAppContext()
    const [setReminder, clearReminder] = useReminder();
    const selectedTask = ctx.selectedRow;

    const hasRepeatDate = selectedTask && selectedTask.repeatPeriod != null;
    let repeatText = "Repeat";
    if (hasRepeatDate) {
        const [repeatsCount, repeatsInterval] = selectedTask.repeatPeriod;
        const displayName = RepeatDisplayNameHelper(repeatsInterval);
        repeatText = displayName;
    }

    const handleClearReminder = (e) => {
        e.preventDefault();
        e.stopPropagation();
        clearReminder(ReminderEnum.REPEAT);
    }

    const closeDropdown = useCallback(() => {
        const dd = new Dropdown(ref.current);
        dd.hide();
    }, [ref]);

    return <div className="dropdown d-flex justify-content-between align-items-center"
                onClick={ () => {
                } }>
        <div className=" d-flex justify-content-between align-items-center pointer flex-grow-1"
             data-bs-toggle="dropdown"
             data-bs-auto-close="outside"
            // disabled={ isOpen }
             ref={ ref }
             aria-expanded="false">
                  <span className="me-3">
                        <CalendarRepeat className={ hasRepeatDate ? "text-primary" : "" }/>
                 </span>
            <div className="form-control me-1 d-flex flex-column ">
                <span className={ hasRepeatDate ? "text-primary" : "" }>{ repeatText }</span>
            </div>

        </div>
        <RepeatMenuItems setReminder={ setReminder } setIsOpen={ setIsOpen } isOpen={ isOpen }
                         closeDropdown={ closeDropdown }/>


        { hasRepeatDate && <button type="button"
                                   className="btn-close"
                                   aria-label="Close"
                                   onClick={ handleClearReminder }/> }
    </div>
});

export default RepeatInput;