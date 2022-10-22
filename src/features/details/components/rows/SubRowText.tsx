import React, { useState, useTransition } from "react";
import { updateSubTask } from "@features/tasks";
import { ITask } from "@/constants/types/tasksTypes";
import { useAppDispatch } from "@/constants/types/redux";
import { InputBase } from "@mui/material";

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
    <InputBase
      sx={{ flexGrow: 1 }}
      value={value}
      onChange={onChange}
      inputProps={{
        style: {
          textDecoration: isChecked ? "line-through" : "none",
        },
      }}
    />
  );
};

export { SubRowText };
