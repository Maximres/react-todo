import React, { useState, useTransition } from "react";
import { handleEnterKeyPress } from "@/utils/helpers/enterKeyHandler";
import cn from "classnames";
import { updateSubTask } from "@features/tasks";
import { ITask } from "@/constants/types/tasksTypes";
import { useAppDispatch } from "@/constants/types/redux";

type Props = {
  uid: string;
  text?: string;
  isChecked: boolean;
};

const SubRowText = ({ uid, isChecked, text = "" }: Props) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(text);
  const [, startTransition] = useTransition();

  const onChange = (e: any) => {
    startTransition(() => {
      setValue(e.target.value);
      handleChange(uid, e.target.value);
    });
  };

  const handleChange = (uid: string, text: string) => {
    dispatch(
      updateSubTask({
        subId: uid,
        subTask: {
          text: text,
        } as ITask,
      }),
    );
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
