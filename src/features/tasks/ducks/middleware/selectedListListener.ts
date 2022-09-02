import { AppStartListening } from "@/constants/types/redux";
import { createSubTask, selectList, setSubtasks } from "@features/tasks";
import isEmpty from "lodash/isEmpty";
import { dataService } from "@/services/data";
import { ITask } from "@/constants/types/tasksTypes";

export const selectedListListener = (startListening: AppStartListening) => {
  startListening({
    matcher: selectList.match,
    effect: async (
      action,
      { dispatch, cancelActiveListeners, getOriginalState },
    ) => {
      cancelActiveListeners();
      const ids = action.payload.tasks.map((t) => t.id);

      if (isEmpty(ids)) return;

      const subTasks = await dataService.getSubtasksMany(ids);
      dispatch(setSubtasks(subTasks));
    },
  });
};

export const subTaskCreatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: createSubTask.match,
    effect: async (action, { getState, dispatch }) => {
      const subTaskId = action.payload.subId;
      const tasks = getState().tasks.tasks;
      const index = tasks.findIndex(
        (t) => t.subTasks?.find((s) => s.id === subTaskId) != null,
      );
      if (index < 0) return;
      const sub = tasks[index]!.subTasks?.find((s) => s.id === subTaskId);
      if (!isEmpty(sub)) {
        await dataService.setSubtask(tasks[index], sub as ITask);
      }
    },
  });
};
