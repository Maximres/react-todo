import React, { useEffect, useRef, useState } from "react";
import { KeyCodes } from "@/constants/enums/keyCodes";
import classNames from "classnames";

type Props = {
  name: string;
  isEditMode?: boolean;
  onBlur?: () => void;
  submitEdit: (text: string) => void;
  [key: string]: any;
};

const ListsInput = ({ name, isEditMode, submitEdit, onBlur = () => {}, ...rest }: Props) => {
  const [disabled, setDisabled] = useState(!isEditMode);
  const [text, setText] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    if (disabled) {
      return;
    }

    const listNameChanged = name !== text;
    if (listNameChanged) {
      submitEdit(text);
    }

    setDisabled(true);
    onBlur();
  };

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const handleClick = (e: any) => {
    setDisabled(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.keyCode === KeyCodes.Escape) {
      setDisabled(true);
      setText(name);
      return;
    }

    if (e.keyCode === KeyCodes.Enter) {
      handleBlur();
      return;
    }
  };

  useEffect(() => {
    if (disabled) {
      inputRef.current?.blur();
      return;
    }

    inputRef.current?.focus();
  }, [disabled]);

  return (
    <span onDoubleClick={handleClick}>
      <input
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoFocus={isEditMode}
        ref={inputRef}
        type="text"
        className={classNames("border-0 bg-transparent flex-grow-1 text-truncate", [
          rest["className"],
        ])}
      />
    </span>
  );
};

export { ListsInput };
