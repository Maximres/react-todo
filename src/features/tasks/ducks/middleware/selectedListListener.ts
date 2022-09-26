import { AppStartListening } from "@/constants/types/redux";
import { setSubtasks, setTasks } from "@features/tasks";
import isEmpty from "lodash/isEmpty";
import { dataService } from "@/services/data";
import { selectList } from "@features/lists";

export const selectedListListener = (startListening: AppStartListening) => {
  startListening({
    matcher: selectList.match,
    effect: async (action, { dispatch, cancelActiveListeners, delay, signal }) => {
      cancelActiveListeners();
      if (action.payload == null) return;

      const tasks = await dataService.getTasks(action.payload.id);
      if (signal.aborted) return;

      dispatch(setTasks(tasks));

      const ids = tasks.map((t) => t.id);
      if (isEmpty(ids)) return;

      const subTasks = await dataService.getSubtasksMany(ids);
      if (signal.aborted) return;

      dispatch(setSubtasks(subTasks));
    },
  });
};
