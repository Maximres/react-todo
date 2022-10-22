import React, { useEffect, useState, useTransition } from "react";
import { updateSubTask } from "@features/tasks";
import { ITask } from "@/constants/types/tasksTypes";
import { useAppDispatch } from "@/constants/types/redux";
import { Box, Checkbox } from "@mui/material";

type Props = {
  uid: string;
  isChecked: boolean;
};

const SubRowCheckBox = ({ uid, isChecked }: Props) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(isChecked);
  const [_, startTransition] = useTransition();

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  const onChange = () => {
    startTransition(() => {
      const value = !checked;
      setChecked(value);
      onChecked(uid, value);
    });
  };

  const onChecked = (uid: string, isChecked: boolean) => {
    dispatch(
      updateSubTask({
        subId: uid,
        subTask: {
          isChecked: isChecked,
        } as ITask,
      }),
    );
  };

  return (
    <Box sx={{ width: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Checkbox size="small" checked={checked} onChange={onChange} />
    </Box>
  );
};

export { SubRowCheckBox };
