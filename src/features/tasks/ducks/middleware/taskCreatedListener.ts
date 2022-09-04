import { AppStartListening } from "@/constants/types/redux";
import { createTask } from "@features/tasks";
import { dataService } from "@/services/data";

export const taskCreatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: createTask.match,
    effect: async (action, { getState }) => {
      const { id } = action.payload;
      const tasks = getState().tasks.tasks;
      const task = tasks.find((t) => t.id === id);
      if (task == null) return;

      await dataService.setTask(task);
    },
  });
};
