import { AppStartListening } from "@/constants/types/redux";
import { promoteSubTask } from "@features/tasks";
import { dataService } from "@/services/data";

export const subTaskPromotedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: promoteSubTask.match,
    effect: async (action, { getState }) => {
      const subId = action.payload;
      const state = getState().tasks;
      const tasks = state.tasks;

      const task = state.tasks.find((x) => x.id === state.selectedRowId);
      if (task == null) return;

      const promotedSubTask = tasks.find((x) => x.id === subId);
      if (promotedSubTask == null) return;

      await dataService.promoteSubtask(task.id, promotedSubTask);
    },
  });
};
