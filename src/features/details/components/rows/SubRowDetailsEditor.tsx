import React from "react";
import Icons from "@/components/AppIcons";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { toggleSubTaskChecked, updateSubTask } from "@features/tasks";
import isEmpty from "lodash/isEmpty";
import { SubRowCheckBox } from "@/features/details/components/rows/SubRowCheck";
import { SubRowText } from "@/features/details/components/rows/SubRowText";
import { ITask } from "@/constants/types/tasksTypes";

const SubRowDetailsEditor = () => {
  const subTasks = useAppSelector((s) => s.details.subTasks);
  const dispatch = useAppDispatch();
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

  const handleSubCheck = (uid: string, isChecked: boolean) => {
    dispatch(
      updateSubTask({
        subId: uid,
        subTask: {
          isChecked: isChecked
        } as ITask,
      }),
    );
  };
  return (
    <>
      {!isEmpty(subTasks) &&
        subTasks!.map((subTask) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={subTask.id}
            >
              <SubRowCheckBox
                uid={subTask.id}
                isChecked={subTask.isChecked}
                onChecked={handleSubCheck}
              />
              <SubRowText
                uid={subTask.id}
                text={subTask.text}
                isChecked={subTask.isChecked}
                handleChange={handleChange}
              />
              <div className="mx-2">
                <Icons.Options />
              </div>
            </li>
          );
        })}
    </>
  );
};

export default SubRowDetailsEditor;
