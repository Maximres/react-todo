import { AppStartListening } from "@/constants/types/redux";
import { updateList } from "@features/lists";
import { dataService } from "@/services/data";
import { isAnyOf } from "@reduxjs/toolkit";
import { createTask, deleteTask, moveTask, promoteSubTask } from "@features/tasks";

export const totalTasksListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(createTask, deleteTask, promoteSubTask, moveTask),
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
      if (moveTask.match(action)) {
        totalTasks--;
        const targetList = state.userLists.find((x) => x.id === action.payload.listId);
        if (targetList != null) {
          const newTargetList = { ...targetList, totalTasks: targetList.totalTasks + 1 };
          dispatch(updateList(newTargetList));
          await dataService.setList(newTargetList);

        }
      }
      if (promoteSubTask.match(action)) {
        totalTasks++;
      }

      const total = totalTasks < 0 ? 0 : totalTasks;
      const newList = { ...list, totalTasks: total };
      dispatch(updateList(newList));
      await dataService.setList(newList);
    },
  });
};
