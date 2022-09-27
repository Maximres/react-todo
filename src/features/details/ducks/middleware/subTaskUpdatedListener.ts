import { AppStartListening } from "@/constants/types/redux";
import { updateSubTask } from "@features/tasks";
import { dataService } from "@/services/data";

export const subTaskUpdatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: updateSubTask.match,
    effect: async (action, { getState, cancelActiveListeners, delay }) => {
      cancelActiveListeners();
      await delay(300);

      const { subId } = action.payload;
      const state = getState().tasks;

      const tasks = state.tasks;
      const taskIndex = tasks.findIndex((x) => x.id === state.selectedRowId);
      if (taskIndex < 0) return;

      const subTasks = tasks[taskIndex]!.subTasks;
      const subTaskIndex = subTasks?.findIndex((p) => p.id === subId);
      if (subTaskIndex == null || subTaskIndex < 0) return;

      await dataService.setSubtask(tasks[taskIndex], subTasks![subTaskIndex]);
    },
  });
};
