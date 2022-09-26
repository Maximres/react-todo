import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/constants/types/redux";
import _orderBy from "lodash/orderBy";

const orderedTasksSelector = createSelector(
  (s: RootState) => s.tasks.tasks,
  (tasks) => _orderBy(tasks, ["order", "asc"]),
);

export { orderedTasksSelector };
