import { AppStartListening } from "@/constants/types/redux";
import { updateList } from "@features/lists";
import { dataService } from "@/services/data";
import { isAnyOf } from "@reduxjs/toolkit";
import { createTask, deleteTask } from "@features/tasks";

export const totalTasksListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(createTask, deleteTask),
    effect: async (action, { getState, dispatch }) => {
      const state = getState().lists;
      const listId = state.selectedListId;
      const list = state.userLists.find((t) => t.id === listId);

      if (list == null) return;
      let totalTasks = list.totalTasks;
      if (createTask.match(action)) {
        totalTasks++;
      }
      if (deleteTask.match(action)) {
        totalTasks--;
      }

      const newList = { ...list, totalTasks: totalTasks };
      dispatch(updateList(newList));
      await dataService.setList(newList);
    },
  });
};
