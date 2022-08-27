import { createSlice } from "@reduxjs/toolkit";
import { IList, IListsState } from "../../constants/types/listsTypes";
import Icons from "../../components/AppIcons";

const initialState: IListsState = {
  defaultLists: [
    { name: "My Day", Icon: Icons.MyDay({ }), taskId: "1", tasksTotal: 1 },
    { name: "Important", Icon: Icons.Favorite({ }), taskId: "2", tasksTotal: 4 },
    { name: "My Day", Icon: Icons.MyDay({ }), taskId: "3", tasksTotal: 2 },
  ] as IList[],
  customLists: [
    { name: "Custom 1", taskId: "11", tasksTotal: 1 },
    { name: "Custom 2", Icon: Icons.Favorite({ }), taskId: "22", tasksTotal: 4 },
    { name: "Custom 3", Icon: Icons.MyDay({ }), taskId: "33", tasksTotal: 2 },
  ] as IList[],
  groups: [],
};

const listsSlice = createSlice({
  name: "lists",
  initialState: initialState,
  reducers: {},
});

export default listsSlice.reducer;