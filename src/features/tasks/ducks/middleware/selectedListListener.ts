import { AppStartListening } from "@/constants/types/redux";
import { selectList, setSubtasks } from "@features/tasks";
import isEmpty from "lodash/isEmpty";
import { dataService } from "@/services/data";
import { createSubTask } from "@features/details";

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

      const subTasks = await dataService.getSubtasks(ids);
      dispatch(setSubtasks(subTasks));
    },
  });
};

export const syncSubTaskListener = (startListening: AppStartListening) => {
  startListening({
    matcher: createSubTask.match,
    effect: (action, { dispatch, cancelActiveListeners, getState }) => {
      const state = getState().details;

      if (isEmpty(state.subTasks)) return;

      dispatch(setSubtasks(state.subTasks!));
    },
  });
};