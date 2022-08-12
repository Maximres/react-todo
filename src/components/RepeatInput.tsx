﻿import React, {useCallback, useState} from "react"
import {Calendar, CalendarRepeat} from "../utils/IconsComponent";
import {forwardRef} from "react";
import ReminderEnum from "../utils/ReminderEnum";
import useReminder from "../hooks/useReminder";
import RepeatMenuItems from "./RepeatMenuItems";
import RepeatDisplayNameHelper from "../utils/RepeatDisplayNameHelper";
import useAppContext from "../contexts/UseAppContext";

type Props = {
    isOpen : boolean,
    setIsOpen: (value: boolean) => void,
    closeDropdown: () => void
}

const RepeatInput = forwardRef(({isOpen, setIsOpen, closeDropdown}: Props, ref: React.Ref<HTMLDivElement>) => {
    const ctx = useAppContext()
    const [setReminder, clearReminder] = useReminder();
    const selectedTask = ctx.selectedRow;

    const hasRepeatDate = selectedTask && selectedTask.repeatPeriod != null;
    let repeatText: string | null = "Repeat";
    if (hasRepeatDate) {
        const [repeatsCount, repeatsInterval] = selectedTask.repeatPeriod as any;
        const displayName = RepeatDisplayNameHelper(repeatsInterval);
        repeatText = displayName;
    }

    const handleClearReminder = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        clearReminder(ReminderEnum.REPEAT);
    }


    return <div className="dropdown d-flex justify-content-between align-items-center"
                onClick={ () => {
                } }>
        <div className=" d-flex justify-content-between align-items-center pointer flex-grow-1"
             data-bs-toggle="dropdown"
             data-bs-auto-close="outside"
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