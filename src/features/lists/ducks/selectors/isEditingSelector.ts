import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/constants/types/redux";

const isEditingSelector = createSelector(
  (s: RootState) => s.lists.editItemId,
  (s: RootState, currentId: string) => currentId,
  (focusedId, currentId) => focusedId === currentId
);

export {isEditingSelector}