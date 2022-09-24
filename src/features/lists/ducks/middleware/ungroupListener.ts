﻿import { AppStartListening } from "@/constants/types/redux";
import { unGroup } from "@features/lists";
import { dataService } from "@/services/data";

export const ungroupListener = (startListening: AppStartListening) => {
  startListening({
    matcher: unGroup.match,
    effect: async (action, { getState, getOriginalState }) => {
      const groupId = action.payload;

      const ungroupedList = getOriginalState()
        .lists.userLists.filter((x) => x.groupId === groupId)

      await dataService.ungroupLists(ungroupedList);
    },
  });
};
