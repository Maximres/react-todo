import React from "react";
import {useCallback, useEffect, useId, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import DatePickerContainer from "./DatePickerContainer";
import CustomRepeatIntervalPicker from "./CustomRepeatIntervalPicker";
import {Dropdown} from "bootstrap/dist/js/bootstrap.esm";

type Props = {
    dateTimeType: string,
    customInput: (props: any) => React.ReactNode
}

const ReminderDatePickerDropdown = ({customInput}: Props) => {
    const id = useId();
    const [customDate, setCustomDate] = useState(new Date());
    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef();
    const dropdownRef = useRef<HTMLElement>();


    const closeDropdown = useCallback(() => {
        const dd = new Dropdown(dropdownRef?.current);
        dd.hide();
    }, [dropdownRef]);

    useEffect(() => {

        const handleHiddenDropdown = () => {
            setIsOpen(false);
        }
        dropdownRef.current?.addEventListener("hidden.bs.dropdown", handleHiddenDropdown)

        return () => {
            dropdownRef.current?.removeEventListener("hidden.bs.dropdown", handleHiddenDropdown)
        }
    }, [])

    return <div className="flex-grow-1">
        { customInput({
            ref: dropdownRef,
            isOpen: isOpen,
            setIsOpen: setIsOpen,
            date: customDate,
            id: id,
            closeDropdown
        }) }


    </div>

}
export default ReminderDatePickerDropdown;