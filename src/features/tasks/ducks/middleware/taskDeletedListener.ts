import { AppStartListening } from "@/constants/types/redux";
import { deleteTask } from "@features/tasks";
import { dataService } from "@/services/data";

export const taskDeletedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: deleteTask.match,
    effect: async (action, { getState }) => {
      const taskId = action.payload;
      const parentId = getState().tasks.listId;
      await dataService.deleteTask(taskId, parentId);
    },
  });
};
