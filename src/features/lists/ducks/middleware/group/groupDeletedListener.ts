import { AppStartListening } from "@/constants/types/redux";
import { deleteGroup } from "@features/lists";
import { dataService } from "@/services/data";

export const groupDeletedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: deleteGroup.match,
    effect: async (
      action,
      { getOriginalState },
    ) => {
      const groupId = action.payload;

      const index = getOriginalState().lists.groups.findIndex(
        (x) => x.id === action.payload,
      );
      if (index < 0) return;

      await dataService.deleteGroup(groupId);
    },
  });
};
