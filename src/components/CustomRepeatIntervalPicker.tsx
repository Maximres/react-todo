import React from "react";
import {useState} from "react";
import ReminderEnum from "../utils/ReminderEnum";

type Props = {
    setIsOpen: (value: boolean) => void,
    setReminder: (dateType: ReminderEnum, value: any ) => void,
    closeDropdown: () => void,
}

const CustomRepeatIntervalPicker = ({setIsOpen, setReminder, closeDropdown}: Props) => {
    const [repeats, setRepeats] = useState(1)
    const [interval, setInterval] = useState(ReminderEnum.REPEAT_DAILY)

    const onRepeatsChange = (e: any) => {
        setRepeats(e.target.value)
    }

    const onDateTimePeriodChange = (e: any) => {
        setInterval(e.target.value)
    }

    const onSave = () => {
        setReminder(ReminderEnum.REPEAT, [repeats, interval]);
        closeDropdown();
    }

    return <div className="w-100 ">

        <div className="container ">

            <div className="form-group row">
                <div className="col-3 pe-1">
                    <input type="text" value={repeats} onChange={onRepeatsChange} max={999} min={1} className="form-control" data-preseve-border="true"/>
                </div>
                <div className="col-9 ps-0">
                    <select className="form-select" onChange={onDateTimePeriodChange}>
                        <option value={ReminderEnum.REPEAT_DAILY}>days</option>
                        <option value={ReminderEnum.REPEAT_WEEKLY}>weeks</option>
                        <option value={ReminderEnum.REPEAT_MONTHLY}>months</option>
                        <option value={ReminderEnum.REPEAT_YEARLY}>years</option>
                    </select>

                </div>
            </div>
            <div className="d-flex gap-1">
                <button type="button" onClick={ () => setIsOpen(false) } className="btn btn-secondary btn-sm px-4 mt-2 flex-grow-1">Cancel
                </button>
                <button type="button" onClick={ onSave } className="btn btn-primary btn-sm px-4 mt-2 flex-grow-1">Save
                </button>
            </div>
        </div>
    </div>
}

export default CustomRepeatIntervalPicker;