import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/constants/types/redux";

const selectCurrentList = createSelector(
  (s: RootState) => s.lists.userLists,
  (s: RootState) => s.tasks.listId,
  (lists, listId) => lists.find((x) => x.id === listId),
);

export { selectCurrentList };
