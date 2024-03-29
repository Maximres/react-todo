﻿import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/constants/types/redux";
import _groupBy from "lodash/groupBy";
import _orderBy from "lodash/orderBy";
import { IGroupedList } from "../constants/types";
import { UngroupedName } from "@/features/lists/ducks/constants/constants";

export const orderedListsAndGroupsSelector = createSelector(
  (x: RootState) => x.lists.userLists,
  (x: RootState) => x.lists.groups,
  (lists, groups) => {
    const groupedById = _groupBy(lists, (l) => l.groupId || UngroupedName);
    const ungrouped = groupedById[UngroupedName] ?? [];
    const groped = groups.map(
      (x) =>
        ({
          id: x.id,
          name: x.name,
          order: x.order,
          lists: _orderBy(groupedById[x.id] || [], ["order", "asc"]),
        } as IGroupedList),
    );
    return _orderBy([...ungrouped, ...groped], ["order", "asc"]);
  },
);
