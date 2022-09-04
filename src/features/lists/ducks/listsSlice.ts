import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IList, IListsState } from "@/constants/types/listsTypes";
import { initialFetchLists } from "@/app/App";
import assignDeep from "lodash/assignIn";

const initialState: IListsState = {
  defaultLists: [
    { name: "My Day", iconName: "MyDay", groupId: "1", tasksTotal: 1 },
    {
      name: "Important",
      iconName: "Favorite",
      groupId: "2",
      tasksTotal: 4,
    },
    { name: "My Day", iconName: "", groupId: "3", tasksTotal: 2 },
  ] as IList[],
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
  },
  extraReducers: (builder) => {
    builder.addCase(initialFetchLists.fulfilled, (state, action) => {
      const lists = action.payload;
      state.userLists = lists;
    });
  },
});

export const { updateList } = listsSlice.actions;

export const listsReducer = listsSlice.reducer;
