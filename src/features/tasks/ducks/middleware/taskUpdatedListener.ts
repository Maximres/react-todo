import { AppStartListening } from "@/constants/types/redux";
import { updateTask } from "@features/tasks";
import { dataService } from "@/services/data";

export const taskUpdatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: updateTask.match,
    effect: async (action, { getState }) => {
      const taskId = action.payload.id;
      const tasks = getState().tasks.tasks;
      const task = tasks.find((t) => t.id === taskId);
      if (task == null) return;

      await dataService.updateTask(task);
    },
  });
};
