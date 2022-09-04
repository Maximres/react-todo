import { AppStartListening } from "@/constants/types/redux";
import { updateDetails } from "../detailsSlice";

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
