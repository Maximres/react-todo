import React, { useEffect, useRef, useState, useTransition } from "react";
import { handleEnterKeyPress } from "@/utils/helpers/enterKeyHandler";
import cn from "classnames";

type Props = {
  uid: string;
  text?: string;
  isChecked: boolean;
  handleChange: (uid: string, text: string) => void;
};

const SubRowText = ({ uid, isChecked, handleChange, text = "" }: Props) => {
  const [value, setValue] = useState(text);
  const [isPending, startTransition] = useTransition();

  const onChange = (e: any) => {
    startTransition(() => {
      setValue(e.target.value);
      handleChange(uid, e.target.value)
    });
  };

  return (
    <textarea
      rows={1}
      className={cn("form-control me-1 overflow-hidden ", {
        "text-decoration-line-through": isChecked,
      })}
      value={value}
      onKeyPress={handleEnterKeyPress}
      onChange={onChange}
    />
  );
};

export { SubRowText };
