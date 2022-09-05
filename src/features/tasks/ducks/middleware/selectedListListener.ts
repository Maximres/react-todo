import { AppStartListening } from "@/constants/types/redux";
import { setSubtasks } from "@features/tasks";
import isEmpty from "lodash/isEmpty";
import { dataService } from "@/services/data";
import { selectList } from "@features/lists";

export const selectedListListener = (startListening: AppStartListening) => {
  startListening({
    matcher: selectList.match,
    effect: async (action, { dispatch, cancelActiveListeners, delay }) => {
      cancelActiveListeners();
      await delay(500);

      const ids = action.payload.tasks.map((t) => t.id);

      if (isEmpty(ids)) return;

      const subTasks = await dataService.getSubtasksMany(ids);
      dispatch(setSubtasks(subTasks));
    },
  });
};


