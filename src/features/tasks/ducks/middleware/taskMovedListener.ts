import { AppStartListening } from "@/constants/types/redux";
import { moveTask } from "@features/tasks";
import { dataService } from "@/services/data";

export const taskMovedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: moveTask.match,
    effect: async (action, { getOriginalState, dispatch }) => {
      const { taskId, listId } = action.payload;
      const movedTask = getOriginalState().tasks.tasks.find((x) => x.id === taskId);
      if (movedTask == null) return;

      await dataService.moveTask(listId, movedTask);
    },
  });
};
