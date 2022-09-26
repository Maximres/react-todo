import { AppStartListening } from "@/constants/types/redux";
import { updateGroup } from "@features/lists";
import { dataService } from "@/services/data";

export const groupUpdatedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: updateGroup.match,
    effect: async (action, { getState, cancelActiveListeners, delay, dispatch }) => {
      cancelActiveListeners();
      await delay(1000);

      const groupId = action.payload.id;
      const groups = getState().lists.groups;
      const group = groups.find((t) => t.id === groupId);
      if (group == null) return;
      await dataService.updateGroup(group);
    },
  });
};
