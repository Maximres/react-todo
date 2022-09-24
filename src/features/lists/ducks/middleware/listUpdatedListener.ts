import { AppStartListening } from "@/constants/types/redux";
import { updateList } from "@features/lists";
import { dataService } from "@/services/data";

export const listUpdatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: updateList.match,
    effect: async (
      action,
      { getState, cancelActiveListeners, delay, dispatch },
    ) => {
      cancelActiveListeners();
      await delay(1000);

      const listId = action.payload.id;
      const lists = getState().lists.userLists;
      const list = lists.find((t) => t.id === listId);
      if (list == null) return;
      await dataService.updateList(list);
    },
  });
};
