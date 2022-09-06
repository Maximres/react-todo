import React, { useEffect, useRef, useState } from "react";
import Icons from "@/components/AppIcons";
import cn from "classnames";
import { KeyCodes } from "@/constants/enums/keyCodes";

type Props = {
  isSubItem?: boolean;
  Icon?: JSX.Element | null;
  name: string;
  total: number;
  uid: string;
  onClick: (uid: string) => void;
  submitEdit: (uid: string, name: string) => void;
  isFocused?: boolean
};

const ListItem = ({
  uid,
  name,
  isSubItem = false,
  isFocused = false,
  Icon = <Icons.List />,
  total = 0,
  onClick,
  submitEdit,
}: Props) => {
  const [disabled, setDisabled] = useState(!isFocused);
  const [text, setText] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    if (disabled) {
      return;
    }

    const listNameChanged = name !== text;
    if (listNameChanged) {
      submitEdit(uid, text);
    }

    setDisabled(true);
  };

  const handleChange = (e: any) => {
    setText(e.target.value);
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
    <li
      className="list-group-item list-group-item-action border-0 bg-light"
      onClick={() => onClick(uid)}
      onDoubleClick={(e) => {
        setDisabled(false);
      }}
    >
      <div
        className={cn("d-flex align-items-center", {
          " group-item-ms": isSubItem,
        })}
      >
        {Icon}
        <input
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          autoFocus={isFocused}
          ref={inputRef}
          type="text"
          className="border-0 bg-transparent flex-grow-1 mx-3 text-truncate"
        />
        <span className="badge rounded-pill bg-badge-light text-dark ms-auto fw-light">
          {total}
        </span>
      </div>
    </li>
  );
};

export default ListItem;
