import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { Dropdown } from "bootstrap/dist/js/bootstrap.esm";

type Props = {
  dateTimeType: string;
  CustomInput: React.ForwardRefExoticComponent<any>;
};

const ReminderDatePickerDropdown = ({ CustomInput }: Props) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLElement>();

  const closeDropdown = useCallback(() => {
    const dd = new Dropdown(dropdownRef?.current);
    dd.hide();
  }, [dropdownRef]);

  useEffect(() => {
    const handleHiddenDropdown = () => {
      setIsOpen(false);
    };
    const dropdownNode = dropdownRef.current;
    dropdownNode?.addEventListener("hidden.bs.dropdown", handleHiddenDropdown);

    return () => {
      dropdownNode?.removeEventListener("hidden.bs.dropdown", handleHiddenDropdown);
    };
  }, []);

  return (
    <div className="flex-grow-1">
      {
        <CustomInput
          ref={dropdownRef}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          id={id}
          closeDropdown={closeDropdown}
        />
      }
    </div>
  );
};
export default ReminderDatePickerDropdown;
