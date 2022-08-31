import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IRow, IState } from "constants/types/tasksTypes";

const initialState: IState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<IRow>) => {
      const index = state.tasks.findIndex((x) => x.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
    createTask: {
      reducer(state, action: PayloadAction<{ text: string; id: string }>) {
        const newTask: IRow = {
          parentId: "##########", //todo
          id: action.payload.id,
          isChecked: false,
          text: action.payload.text,
          isImportant: false,
          createdDate: Number(new Date()),
          subTasks: [],
          remindDate: undefined,
          isMyDay: false,
          dueDate: undefined,
        };
        state.tasks.push(newTask);
      },
      prepare(text: string) {
        return {
          payload: {
            text,
            id: nanoid(),
          },
        };
      },
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((x) => x.id === action.payload);
      if (index == null) throw new Error("Task is not found");

      state.tasks.splice(index, 1);

      if (state.selectedRowId === action.payload) {
        state.selectedRowId = undefined;
      }
    },
    toggleSelected: (state, action: PayloadAction<{ task: IRow }>) => {
      const currentId = action.payload.task.id;
      const toggleWithoutClose =
        currentId !== state.selectedRowId && state.selectedRowId != null;
      if (toggleWithoutClose) {
        state.selectedRowId = currentId;
        return;
      }

      const sameTaskSelected = currentId === state.selectedRowId;
      state.selectedRowId = !sameTaskSelected ? currentId : undefined;
    },
    closeSidebar: (state) => {
      state.selectedRowId = undefined;
    },
    toggleFavorite: (
      state,
      action: PayloadAction<{ task: IRow; isImportant: boolean }>,
    ) => {
      const task = action.payload.task;
      const isImportant = action.payload.isImportant;
      const index = state.tasks.findIndex((x) => x.id === task.id);
      state.tasks[index].isImportant = isImportant;
    },
    toggleChecked: (
      state,
      action: PayloadAction<{ task: IRow; isChecked: boolean }>,
    ) => {
      const task = action.payload.task;
      const isChecked = action.payload.isChecked;
      const filtered = state.tasks.filter((x) => x.id !== task.id);
      const tasks = [...filtered, { ...task, isChecked: isChecked }];
      state.tasks = tasks;
    },
    selectRow: (state, action: PayloadAction<IRow>) => {
      state.selectedRowId = action.payload.id;
    },
  },
});

export const mainReducer = tasksSlice.reducer;
export const {
  selectRow,
  toggleChecked,
  toggleFavorite,
  toggleSelected,
  closeSidebar,
  updateTask,
  createTask,
  deleteTask,
} = tasksSlice.actions;
