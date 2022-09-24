import { AppStartListening } from "@/constants/types/redux";
import { createList, selectList, startEditItem } from "@features/lists";
import { dataService } from "@/services/data";

export const listCreatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: createList.match,
    effect: async (action, { getState, dispatch }) => {
      const { id } = action.payload;
      const lists = getState().lists.userLists;
      const list = lists.find((t) => t.id === id);
      if (list == null) return;

      dispatch(selectList(list));
      dispatch(startEditItem(list.id));

      await dataService.setList(list);
    },
  });
};