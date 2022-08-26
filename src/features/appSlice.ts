import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IRow, IState } from "../constants/types/appTypes";

const rowsMockData: IRow[] = [
  {
    id: nanoid(),
    isChecked: true,
    text: "lorem10",
    isFavorite: true,
    isMyDay: false,
    subTasks: [],
    createdDate: Number(new Date()),
  },
  {
    id: nanoid(),
    isChecked: true,
    text: "lorem11",
    isFavorite: true,
    isMyDay: false,
    subTasks: [],
    createdDate: Number(new Date()),
  },
  {
    id: nanoid(),
    isChecked: false,
    text: "lorem12",
    isFavorite: false,
    isMyDay: false,
    createdDate: Number(new Date(1995, 11, 17)),
    subTasks: [
      {
        id: nanoid(),
        isChecked: false,
        text: "lorem15",
        createdDate: Number(new Date(1995, 11, 19)),
      },
    ],
  },
];

const initialState: IState = {
  tasks: rowsMockData,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<IRow>) => {
      const index = state.tasks.findIndex((x) => x.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
    createTask: {
      reducer(state, action: PayloadAction<{ text: string; id: string }>) {
        const newTask: IRow = {
          id: action.payload.id,
          isChecked: false,
          text: action.payload.text,
          isFavorite: false,
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
      action: PayloadAction<{ task: IRow; isFavorite: boolean }>,
    ) => {
      const task = action.payload.task;
      const isFavorite = action.payload.isFavorite;
      const index = state.tasks.findIndex((x) => x.id === task.id);
      state.tasks[index].isFavorite = isFavorite;
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

export default appSlice.reducer;
export const {
  selectRow,
  toggleChecked,
  toggleFavorite,
  toggleSelected,
  closeSidebar,
  updateTask,
  createTask,
  deleteTask,
} = appSlice.actions;
