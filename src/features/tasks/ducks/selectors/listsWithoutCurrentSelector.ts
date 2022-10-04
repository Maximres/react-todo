import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/constants/types/redux";

const listsWithoutCurrentSelector = createSelector(
  (s: RootState) => s.lists.userLists,
  (s: RootState) => s.tasks.listId,
  (lists, listId) => lists.filter((x) => x.id !== listId),
);

export { listsWithoutCurrentSelector };
