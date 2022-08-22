import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IRow, IState, ITask } from "../../constants/types/appTypes";

const rowsMockData: IRow[] = [
  {
    id: nanoid(),
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
    id: nanoid(),
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
    id: nanoid(),
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
        id: nanoid(),
        isChecked: false,
        text: "lorem15",
        createdDate: Number(new Date(1995, 11, 19)),
      },
    ],
  },
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
          repeatPeriod: null,
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
    createSubTask: {
      reducer(
        state,
        action: PayloadAction<{
          parentId: string;
          text: string;
          subId: string;
        }>,
      ) {
        const parentIndex = state.tasks.findIndex(
          (x) => x.id === action.payload.parentId,
        );

        const newSubTask: ITask = {
          id: action.payload.subId,
          isChecked: false,
          text: action.payload.text,
          createdDate: Number(new Date()),
        };
        state.tasks[parentIndex].subTasks.push(newSubTask);
      },
      prepare(parentId: string, text: string) {
        return {
          payload: {
            parentId,
            text,
            subId: nanoid(),
          },
        };
      },
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const index = state.tasks.findIndex((x) => x.id === action.payload);
      if (index == null) throw new Error("Task is not found");

      state.tasks.splice(index, 1);

      if (state.selectedRowId === action.payload) {
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
        state.selectedRowId = action.payload.task?.id as string;
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
    toggleSubTaskChecked: (
      state,
      action: PayloadAction<{
        parentTaskId: string;
        subTaskId: string;
        isChecked: boolean;
      }>,
    ) => {
      const payload = action.payload;
      const isChecked = payload.isChecked;
      const parentTask = state.tasks.find((p) => p.id === payload.parentTaskId);

      if (parentTask == null) throw new Error("Parent task not found");

      const subTask = parentTask.subTasks.find(
        (sub) => sub.id === payload.subTaskId,
      );
      if (subTask == null) throw new Error("Sub task not found");

      subTask.isChecked = isChecked;
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
  createSubTask,
  toggleSubTaskChecked
} = appSlice.actions;
