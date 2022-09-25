import { AppStartListening } from "@/constants/types/redux";
import { copyList, createList, selectList, startEditItem } from "@features/lists";
import { dataService } from "@/services/data";

export const listCopiedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: copyList.match,
    effect: async (action, { getState, dispatch }) => {
      const { newId } = action.payload;
      const lists = getState().lists.userLists;
      const copiedList = lists.find((t) => t.id === newId);
      if (copiedList == null) return;

      await dataService.setList(copiedList);
    },
  });
};