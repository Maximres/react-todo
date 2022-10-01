import { AppStartListening } from "@/constants/types/redux";
import { updateDetails } from "../detailsSlice";
import { isAnyOf } from "@reduxjs/toolkit";
import {
  createSubTask,
  deleteSubTask, deleteTask,
  promoteSubTask,
  toggleChecked,
  toggleFavorite,
  toggleSelected,
  updateSubTask,
  updateTask,
} from "@features/tasks";

export const taskChangedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(
      toggleChecked,
      toggleFavorite,
      toggleSelected,
      updateTask,
      updateSubTask,
      createSubTask,
      deleteSubTask,
      promoteSubTask,
      deleteTask,
    ),
    effect: (action, { getState, dispatch }) => {
      const app = getState().tasks;
      const rowId = app.selectedRowId;
      const task = app.tasks.find((t) => t.id === rowId);
      dispatch(updateDetails(task));
    },
  });
};
