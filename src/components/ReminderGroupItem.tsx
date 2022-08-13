import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import DatePickerContainer from "./DatePickerContainer";

type Props = {
  dateTimeType: string;
  datePickerProps: {};
  customInput: (props: any) => React.ReactNode;
};

const ReminderDatePickerDropdown = ({
  datePickerProps,
  customInput,
  dateTimeType,
}: Props) => {
  const id = useId();
  const [customDate, setCustomDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<any>();
  const dropdownRef = useRef();

  useEffect(() => {
    datePickerRef?.current?.setOpen(isOpen);
  }, [isOpen]);

  const CalendarContainer = useCallback((props: any) => {
    return (
      <DatePickerContainer
        {...props}
        date={customDate}
        dateTimeType={dateTimeType}
        closeCalendar={() => {
          setIsOpen(false);
        }}
      />
    );
  }, []);

  return (
    <DatePicker
      className="border-0 bg-transparent"
      {...datePickerProps}
      selected={customDate}
      disabled={!isOpen}
      onChange={(date) => setCustomDate(date)}
      onCalendarClose={() => setIsOpen(false)}
      ref={datePickerRef as any}
      customInputRef="inputRef"
      // inputRef={ dropdownRef as any }
      customInput={customInput({
        isOpen: isOpen,
        setIsOpen: setIsOpen,
        date: customDate,
        id: id,
        ref: dropdownRef,
      })}
      calendarContainer={CalendarContainer}
    />
  );
};
export default ReminderDatePickerDropdown;
