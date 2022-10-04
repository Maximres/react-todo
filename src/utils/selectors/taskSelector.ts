import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/constants/types/redux";
import { ITask } from "@/constants/types/tasksTypes";

const selectTasks = (state: RootState) => state.tasks.tasks;

const taskSelector = createSelector(
  selectTasks,
  (state: RootState, taskId?: string) => taskId,
  (tasks, taskId) => {
    return tasks.find((x) => x.id === taskId);
  },
  {
    memoizeOptions: {
      maxSize: 2,
    },
  },
);

export { taskSelector };
