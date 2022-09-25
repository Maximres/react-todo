import { AppStartListening } from "@/constants/types/redux";
import { createGroup, startEditItem } from "@features/lists";
import { dataService } from "@/services/data";

export const groupCreatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: createGroup.match,
    effect: async (action, { getState, dispatch }) => {
      const { id } = action.payload;
      const groups = getState().lists.groups;
      const group = groups.find((t) => t.id === id);
      if (group == null) return;

      dispatch(startEditItem(group.id));
      await dataService.setGroup(group);
    },
  });
};