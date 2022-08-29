import { createSlice } from "@reduxjs/toolkit";
import { IList, IListsState } from "constants/types/listsTypes";
import Icons from "components/AppIcons";
import { fetchLists } from "app/App";

const initialState: IListsState = {
  defaultLists: [
    { name: "My Day", iconName: "MyDay", groupId: "1", tasksTotal: 1 },
    {
      name: "Important",
      iconName: Icons.Favorite({}),
      groupId: "2",
      tasksTotal: 4,
    },
    { name: "My Day", iconName: "", groupId: "3", tasksTotal: 2 },
  ] as IList[],
  customLists: [],
  groups: [],
};

const listsSlice = createSlice({
  name: "lists",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLists.pending, () => {
    });
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      const lists = action.payload;
      state.customLists = lists;
    });
  },
});

export default listsSlice.reducer;
