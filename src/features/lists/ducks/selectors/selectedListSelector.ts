import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/constants/types/redux";

const selectedListSelector = createSelector(
  (s: RootState) => s.lists.userLists,
  (s: RootState) => s.lists.selectedListId,
  (lists, id) => lists.find((x) => x.id === id),
);

export { selectedListSelector };