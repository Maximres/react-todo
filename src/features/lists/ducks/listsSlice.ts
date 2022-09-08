import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IGroup, IList, IListsState } from "@/constants/types/listsTypes";
import assignDeep from "lodash/assignIn";
import { initialFetch } from "@/utils/thunks/initialFetch";

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
    createList: {
      reducer(state, action: PayloadAction<{ name: string; id: string }>) {
        const newList: IList = {
          id: action.payload.id,
          tasks: [] as any,
          name: action.payload.name,
          iconName: "",
          tasksTotal: 0,
          order: Number(Date.now()),
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
          order: Number(Date.now()),
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
    selectList: (state, action: PayloadAction<IList>) => {
      //todo: sync  selectedTicks with db for initial load

      state.selectedList = assignDeep({}, action.payload, {
        selectedTicks: Number(Date.now()),
      });
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

export const { updateList, createList, selectList, createGroup } =
  listsSlice.actions;

export const listsReducer = listsSlice.reducer;
