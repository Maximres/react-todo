import React, { useEffect, useRef, useState } from "react";
import { KeyCodes } from "@/constants/enums/keyCodes";
import classNames from "classnames";

type Props = {
  name: string;
  isFocused?: boolean;
  submitEdit: (text: string) => void;
  [key: string]: any
};

const ListsInput = ({ name, isFocused, submitEdit, ...rest }: Props) => {
  const [disabled, setDisabled] = useState(!isFocused);
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
    <span onClick={handleClick}>
      <input
        value={text}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        autoFocus={isFocused}
        ref={inputRef}
        type="text"
        className={classNames(
          "border-0 bg-transparent flex-grow-1 text-truncate",
          [rest["className"]],
        )}
      />
    </span>
  );
};

export { ListsInput };
