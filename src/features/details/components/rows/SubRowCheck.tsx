import React, { useEffect, useState, useTransition } from "react";
import { updateSubTask } from "@features/tasks";
import { ITask } from "@/constants/types/tasksTypes";
import { useAppDispatch } from "@/constants/types/redux";

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
    <input
      className="form-check-input flex-shrink-0 me-3"
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

export { SubRowCheckBox };
