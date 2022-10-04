import { AppStartListening } from "@/constants/types/redux";
import { toggleChecked, updateTask } from "@features/tasks";
import { dataService } from "@/services/data";
import { isAnyOf } from "@reduxjs/toolkit";

export const taskChangedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(updateTask, toggleChecked),
    effect: async (action, { getState, cancelActiveListeners, delay }) => {
      cancelActiveListeners();
      await delay(1000);

      let taskId: string;
      if (updateTask.match(action)) {
        taskId = action.payload.id;
      }
      if (toggleChecked.match(action)) {
        taskId = action.payload.task.id;
      }

      const tasks = getState().tasks.tasks;
      const task = tasks.find((t) => t.id === taskId);
      if (task == null) return;

      await dataService.updateTask(task);
    },
  });
};
