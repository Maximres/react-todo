import { IList } from "@/constants/types/listsTypes";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/constants/types/redux";
import _groupBy from "lodash/groupBy";

export type GroupList = {
  id: string;
  name: string;
  order: number;
  lists?: IList[];
};

export const selectorListsAndGroupLists = createSelector(
  (x: RootState) => x.lists.userLists,
  (x: RootState) => x.lists.groups,
  (lists, groups) => {
    const groupedById = _groupBy(lists, (l) => l.groupId || "ungrouped");
    const ungrouped = groupedById["ungrouped"] ?? [];
    const groped = groups.map(
      (x) =>
        ({
          id: x.id,
          name: x.name,
          order: x.order,
          lists: groupedById[x.id] ?? [],
        } as GroupList),
    );
    return [...ungrouped, ...groped];
  },
);
