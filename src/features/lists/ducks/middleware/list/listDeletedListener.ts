import { AppStartListening } from "@/constants/types/redux";
import { deleteList, selectList } from "@features/lists";
import { dataService } from "@/services/data";

export const listDeletedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: deleteList.match,
    effect: async (action, { getOriginalState, dispatch }) => {
      const listId = action.payload;

      const index = getOriginalState().lists.userLists.findIndex(
        (x) => x.id === action.payload,
      );
      if (index < 0) return;

      dispatch(selectList());
      await dataService.deleteList(listId);
    },
  });
};
