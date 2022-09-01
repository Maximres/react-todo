import { AppStartListening } from "@/constants/types/redux";
import { selectList, setSubtasks } from "@features/tasks";
import isEmpty from "lodash/isEmpty";
import { dataService } from "@/services/data";

export const selectedListListener = (startListening: AppStartListening) => {
  startListening({
    matcher: selectList.match,
    effect: async (action, { dispatch, cancelActiveListeners }) => {
      cancelActiveListeners();
      const ids = action.payload.tasks.map((t) => t.id);

      if (isEmpty(ids)) return;

      const subTasks = await dataService.getSubtasks(ids);
      dispatch(setSubtasks(subTasks));
    },
  });
};