import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRow, IState } from "../types/appTypes";

const rowsMockData: IRow[] = [
  {
    id: Math.random(),
    isChecked: true,
    text: "lorem10",
    isFavorite: true,
    remindDate: null,
    dueDate: null,
    isMyDay: false,
    repeatPeriod: null,
    subTasks: [],
    createdDate: Number(new Date()),
  },
  {
    id: Math.random(),
    isChecked: true,
    text: "lorem11",
    isFavorite: true,
    remindDate: null,
    dueDate: null,
    isMyDay: false,
    repeatPeriod: null,
    subTasks: [],
    createdDate: Number(new Date()),
  },
  {
    id: Math.random(),
    isChecked: false,
    text: "lorem12",
    isFavorite: false,
    remindDate: null,
    dueDate: null,
    repeatPeriod: null,
    isMyDay: false,
    createdDate: Number(new Date(1995, 11, 17)),
    subTasks: [
      {
        id: Math.random(),
        isChecked: false,
        text: "lorem15",
        createdDate: Number(new Date(1995, 11, 19))
      },
    ],
  } ,
];

const initialState: IState = {
  isSidebarVisible: false,
  isFocused: false,
  tasks: rowsMockData,
  selectedRowId: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<IRow>) => {
      const index = state.tasks.findIndex((x) => x.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
    createTask: (state, action: PayloadAction<string>) => {
      const newTask: IRow = {
        id: Math.random(),
        isChecked: false,
        text: action.payload,
        isFavorite: false,
        createdDate: Number(new Date()),
        subTasks: [],
        remindDate: undefined,
        isMyDay: false,
        repeatPeriod: null,
        dueDate: undefined,
      };
      state.tasks.push(newTask);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const index = state.tasks.findIndex((x) => x.id === action.payload);
      if (index == null)
        throw new Error("Task is not found");

      state.tasks.splice(index, 1);

      if(state.selectedRowId === action.payload){
        state.isSidebarVisible = false;
        state.selectedRowId = null;
      }
    },
    toggleSidebar: (
      state,
      action: PayloadAction<{ task?: IRow; isSidebarVisible: boolean }>,
    ) => {
      const currentlyVisible = state.isSidebarVisible;
      const selectedTaskChanged =
        action.payload.task && action.payload.task.id !== state.selectedRowId;
      const toggleWithoutClose = currentlyVisible && selectedTaskChanged;
      if (toggleWithoutClose) {
        state.selectedRowId = action.payload.task?.id as number;
        return;
      }

      const isSetToVisible = action.payload.isSidebarVisible;
      if (!isSetToVisible) {
        state.isSidebarVisible = isSetToVisible;
        state.selectedRowId = null;
        return;
      }

      if (action.payload.task == null)
        throw new Error("Task can't be null in this case");

      state.isSidebarVisible = isSetToVisible;
      state.selectedRowId = action.payload.task.id;
    },
    toggleFocused: (
      state,
      action: PayloadAction<{ task: IRow; isFavorite: boolean }>,
    ) => {},
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
  toggleFocused,
  toggleSidebar,
  updateTask,
  createTask,
  deleteTask,
} = appSlice.actions;
