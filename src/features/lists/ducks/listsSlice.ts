﻿import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IGroup, IList, IListsState } from "@/constants/types/listsTypes";
import assignDeep from "lodash/assignIn";
import { initialFetch } from "@/utils/thunks/initialFetch";
import { getOrderNumber } from "@/utils/helpers/order";

const defaults = [
  {
    name: "My Day",
    iconName: "MyDay",
    id: "DEFAULT_MY_DAY",
    tasksTotal: 0,
    groupId: "",
  },
  {
    name: "Important",
    iconName: "Favorite",
    id: "DEFAULT_IMPORTANT",
    tasksTotal: 0,
    groupId: "",
  },
] as IList[];
const initialState: IListsState = {
  defaultLists: defaults,
  userLists: [],
  groups: [],
};

const listsSlice = createSlice({
  name: "lists",
  initialState: initialState,
  reducers: {
    updateList(state, action: PayloadAction<IList>) {
      const index = state.userLists.findIndex(
        (x) => x.id === action.payload.id,
      );
      if (index < 0) throw new Error("List is not found");
      const list = state.userLists[index];
      state.userLists[index] = assignDeep({}, list, action.payload);
    },
    createList: {
      reducer(state, action: PayloadAction<{ name: string; id: string }>) {
        const newList: IList = {
          id: action.payload.id,
          tasks: [] as any,
          name: action.payload.name,
          iconName: "",
          tasksTotal: 0,
          order: getOrderNumber(),
          groupId: "",
        };
        state.userLists.push(newList);
      },
      prepare(name: string) {
        return {
          payload: {
            name,
            id: nanoid(),
          },
        };
      },
    },
    createGroup: {
      reducer(state, action: PayloadAction<{ name: string; id: string }>) {
        const newGroup: IGroup = {
          id: action.payload.id,
          name: action.payload.name,
          order: getOrderNumber(),
        };
        state.groups.push(newGroup);
      },
      prepare(name: string) {
        return {
          payload: {
            name,
            id: nanoid(),
          },
        };
      },
    },
    updateGroup(state, action: PayloadAction<IGroup>) {
      const index = state.groups.findIndex((x) => x.id === action.payload.id);
      if (index < 0) throw new Error("Group is not found");
      const group = state.groups[index];
      state.groups[index] = assignDeep({}, group, action.payload);
    },
    selectList(state, action: PayloadAction<IList>) {
      //todo: sync  selectedTicks with db for initial load

      state.selectedList = assignDeep({}, action.payload, {
        selectedTicks: Number(Date.now()),
      });
    },
    startEditItem(state, action: PayloadAction<string>) {
      state.editItemId = action.payload;
    },
    endEditItem(state) {
      state.editItemId = void 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(initialFetch.fulfilled, (state, action) => {
      const [lists, groups] = action.payload;
      state.userLists = lists;
      state.selectedList = lists?.[0];

      state.groups = groups;
    });
  },
});

export const {
  updateList,
  createList,
  selectList,
  createGroup,
  updateGroup,
  startEditItem,
  endEditItem
} = listsSlice.actions;

export const listsReducer = listsSlice.reducer;
