import { AppStartListening } from "@/constants/types/redux";
import { createSubTask } from "@features/tasks";
import isEmpty from "lodash/isEmpty";
import { dataService } from "@/services/data";
import { ISubTask } from "@/constants/types/tasksTypes";

export const subTaskCreatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: createSubTask.match,
    effect: async (action, { getState }) => {
      const subTaskId = action.payload.subId;
      const tasks = getState().tasks.tasks;
      const index = tasks.findIndex(
        (t) => t.subTasks?.find((s) => s.id === subTaskId) != null,
      );
      if (index < 0) return;
      const sub = tasks[index]!.subTasks?.find((s) => s.id === subTaskId);
      if (!isEmpty(sub)) {
        await dataService.setSubtask(tasks[index], sub as ISubTask);
      }
    },
  });
};
