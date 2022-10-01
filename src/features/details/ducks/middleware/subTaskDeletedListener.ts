import { AppStartListening } from "@/constants/types/redux";
import { deleteSubTask } from "@features/tasks";
import { dataService } from "@/services/data";

export const subTaskDeletedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: deleteSubTask.match,
    effect: async (action, { getOriginalState }) => {
      const subId = action.payload;
      const prevState = getOriginalState().tasks;

      const tasks = prevState.tasks;
      const task = tasks.find((x) => x.id === prevState.selectedRowId);
      if (task == null) return;

      const subTasks = task.subTasks;
      const subTaskIndex = subTasks?.findIndex((p) => p.id === subId);
      if (subTaskIndex == null || subTaskIndex < 0) return;

      await dataService.deleteSubtask(subId, task.id, task.parentId);
    },
  });
};
