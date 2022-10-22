import React from "react";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import isEmpty from "lodash/isEmpty";
import { SubRows } from "@/features/details/components/rows/SubRows";
import { ClickEvent } from "@szhsin/react-menu";
import { SubItemOperations } from "@/features/details/ducks/constants/contextMenuOperations";
import { deleteSubTask, promoteSubTask, updateSubTask } from "@features/tasks";
import { ISubTask, ITask } from "@/constants/types/tasksTypes";

const SubRowDetailsEditor = () => {
  const dispatch = useAppDispatch();
  const subTasks = useAppSelector((s) => s.details.subTasks);

  const onItemClick = (e: ClickEvent, subTask: ISubTask) => {
    const value = e.value as SubItemOperations;

    switch (value) {
      case SubItemOperations.ToggleComplete:
        dispatch(
          updateSubTask({
            subId: subTask.id,
            subTask: {
              isChecked: !subTask.isChecked,
            } as ITask,
          }),
        );
        break;
      case SubItemOperations.Promote:
        dispatch(promoteSubTask(subTask.id));
        break;
      case SubItemOperations.Delete:
        dispatch(deleteSubTask(subTask.id));
        break;
    }
  };

  const hasSteps = !isEmpty(subTasks);
  return (
    <>
      {hasSteps &&
        subTasks!.map((subTask) => (
          <>
            <SubRows key={subTask.id} subTask={subTask} onItemClick={onItemClick} />
          </>
        ))}
    </>
  );
};

export default SubRowDetailsEditor;
