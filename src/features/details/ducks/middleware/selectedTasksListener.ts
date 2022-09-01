import { AppStartListening } from "@/constants/types/redux";
import { createSubTask, updateDetails } from "../detailsSlice";
import { dataService } from "@/services/data";
import isEmpty from "lodash/isEmpty";

export const selectedTasksListener = (startListening: AppStartListening) => {
  startListening({
    predicate: (action, currentState, originalState) => {
      const currState = currentState.tasks;
      const prevState = originalState.tasks;
      return (
        currState.selectedRowId !== prevState.selectedRowId ||
        currState.tasks !== prevState.tasks
      );
    },
    effect: async (action, { getState, dispatch }) => {
      const app = getState().tasks;
      const rowId = app.selectedRowId;
      const task = app.tasks.find((t) => t.id === rowId);
      dispatch(updateDetails(task));
    },
  });
};

export const subTaskCreatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: createSubTask.match,
    effect: async (action, { getState, dispatch }) => {
      const subTaskId = action.payload.subId;
      const state = getState().details;
      const sub = state.subTasks?.find((s) => s.id === subTaskId);
      if (!isEmpty(sub)) await dataService.setSubtask(sub);
    },
  });
};
