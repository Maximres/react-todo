import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/constants/types/redux";

const selectCurrentTaskId = (state: RootState) => state.tasks.selectedRowId;
const selectTasks = (state: RootState) => state.tasks.tasks;

const currentTaskSelector = createSelector(
  selectCurrentTaskId,
  selectTasks,
  (currentTaskId, tasks) => {
    return tasks.find((x) => x.id === currentTaskId);
  },
  {
    memoizeOptions: {
      maxSize: 10,
    },
  },
);

export { currentTaskSelector };
