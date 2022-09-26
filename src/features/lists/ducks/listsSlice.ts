import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import assignDeep from "lodash/assignIn";
import { IGroup, IList, IListsState } from "@/constants/types/listsTypes";
import { initialFetch } from "@/utils/thunks/initialFetch";
import { getOrderNumber } from "@/utils/helpers/order";
import { getUntitledName } from "./helpers/getUntitledListName";
import { ListGroupNames } from "@/features/tasks/ducks/constants";

const defaults = [
  {
    name: "My Day",
    iconName: "MyDay",
    id: "DEFAULT_MY_DAY",
    totalTasks: 0,
    groupId: "",
  },
  {
    name: "Important",
    iconName: "Favorite",
    id: "DEFAULT_IMPORTANT",
    totalTasks: 0,
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
      const index = state.userLists.findIndex((x) => x.id === action.payload.id);
      if (index < 0) throw new Error("List is not found");
      const list = state.userLists[index];
      state.userLists[index] = assignDeep({}, list, action.payload);
    },
    createList: {
      reducer(
        state,
        action: PayloadAction<
          { id: string; groupId: string; order: number },
          string,
          { getName: (groups: IList[]) => string }
        >,
      ) {
        const name = action.meta.getName(state.userLists);
        const newList: IList = {
          id: action.payload.id,
          tasks: [] as any,
          totalTasks: 0,
          name: name,
          iconName: "",
          order: action.payload.order,
          groupId: action.payload.groupId,
        };
        state.userLists.push(newList);
      },
      prepare(groupId?: string) {
        return {
          payload: {
            id: nanoid(),
            groupId: groupId ?? "",
            order: getOrderNumber(),
          },
          meta: {
            getName: (groups: IList[]) => getUntitledName(groups, ListGroupNames.NEW_LIST_NAME),
          },
        };
      },
    },
    copyList: {
      reducer(state, action: PayloadAction<{ id: string; newId: string; order: number }>) {
        const src = state.userLists.find((x) => x.id === action.payload.id);

        if (src == null) throw new Error("Can't find List to copy");

        const copy = assignDeep(<IList>{}, src, <IList>{
          selectedTicks: Number(Date.now()),
          id: action.payload.newId,
          order: action.payload.order,
          name: `${src.name} [copy]`,
          totalTasks: 0,
        });
        state.userLists.push(copy);
      },
      prepare(id: string) {
        return {
          payload: {
            id,
            newId: nanoid(),
            order: getOrderNumber(),
          },
        };
      },
    },
    deleteList(state, action: PayloadAction<string>) {
      const index = state.userLists.findIndex((x) => x.id === action.payload);
      if (index < 0) throw new Error("List is not found");
      state.userLists.splice(index, 1);
    },
    createGroup: {
      reducer(
        state,
        action: PayloadAction<
          { id: string; order: number },
          string,
          { getName: (groups: IGroup[]) => string }
        >,
      ) {
        const name = action.meta.getName(state.groups);

        const newGroup: IGroup = {
          id: action.payload.id,
          name: name,
          order: action.payload.order,
        };
        state.groups.push(newGroup);
      },
      prepare() {
        return {
          payload: {
            id: nanoid(),
            order: getOrderNumber(),
          },
          meta: {
            getName: (groups: IGroup[]) => getUntitledName(groups, ListGroupNames.NEW_GROUP_NAME),
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
    deleteGroup(state, action: PayloadAction<string>) {
      const index = state.groups.findIndex((x) => x.id === action.payload);
      if (index < 0) throw new Error("Group is not found");
      state.groups.splice(index, 1);
    },
    unGroup(state, action: PayloadAction<{ groupId: string }>) {
      const listsToUngroup = state.userLists.filter((x) => x.groupId === action.payload.groupId);
      listsToUngroup.forEach((x) => {
        x.groupId = "";
      });
    },
    moveItem(state, action: PayloadAction<{ listId: string; groupId: string }>) {
      const groupIndex = state.groups.findIndex((x) => x.id === action.payload.groupId);
      if (groupIndex < 0) throw new Error("Target Group is not found");
      const list = state.userLists.find((x) => x.id === action.payload.listId);

      if (list == null) throw new Error("List to move is not found");
      list.groupId = action.payload.groupId;
    },
    removeFromGroup(state, action: PayloadAction<{ listId: string }>) {
      const list = state.userLists.find((x) => x.id === action.payload.listId);
      if (list == null) throw new Error("List is not found");

      list.groupId = "";
    },
    selectList(state, action: PayloadAction<IList | undefined>) {
      //todo: sync  selectedTicks with db for initial load

      if (action.payload == null) {
        state.selectedListId = void 0;
        return;
      }

      state.selectedListId = action.payload.id;
      // state.selectedListId = assignDeep({}, action.payload.id, {
      //   selectedTicks: Number(Date.now()),
      // });
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
      state.selectedListId = lists?.[0]?.id;

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
  deleteGroup,
  startEditItem,
  endEditItem,
  unGroup,
  deleteList,
  copyList,
  removeFromGroup,
  moveItem,
} = listsSlice.actions;

export const listsReducer = listsSlice.reducer;
