import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IList } from "@/constants/types/listsTypes";
import { fetchSubtasks } from "@/features/tasks";
import assignDeep from "lodash/assignIn";
import { IState, ISubTask, ITask } from "@/constants/types/tasksTypes";


const initialState: IState = {
  tasks: [],
  listId: "",
  listIcon: "",
  listName: "",
  needSubTasksLoad: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<ITask>) => {
      const index = state.tasks.findIndex((x) => x.id === action.payload.id);
      if (index < 0) return;
      const task = state.tasks[index];
      state.tasks[index] = assignDeep({}, task, action.payload);
    },
    createTask: {
      reducer(state, action: PayloadAction<{ text: string; id: string }>) {
        const newTask: ITask = {
          parentId: state.listId,
          id: action.payload.id,
          isChecked: false,
          text: action.payload.text,
          isImportant: false,
          createdDate: Number(new Date()),
          remindDate: undefined,
          isMyDay: false,
          dueDate: undefined,
          note: "",
          subTasks: [],
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
    createSubTask: {
      reducer(
        state,
        action: PayloadAction<{
          parentId: string;
          text: string;
          subId: string;
        }>,
      ) {
        const parentTask = state.tasks.find(
          (t) => t.id === action.payload.parentId,
        );
        if (parentTask == null) return;

        const newSubTask: ISubTask = {
          id: action.payload.subId,
          isChecked: false,
          text: action.payload.text,
          createdDate: Number(new Date()),
          parentId: action.payload.parentId,
          isNewOne: true,
        };
        state.needSubTasksLoad = true;
        parentTask.subTasks ??= [];
        parentTask.subTasks.push(newSubTask);
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
    deleteSubTask: (state, action: PayloadAction<string>) => {
      if (state.tasks == null) return;

      const index = state.tasks.findIndex((x) => x.id === state.selectedRowId);
      if (index < 0) return;

      const subIndex = state.tasks[index]!.subTasks?.findIndex(
        (x) => x.id === action.payload,
      );
      if (subIndex == null || subIndex < 0) return;

      state.tasks[index]!.subTasks!.splice(subIndex, 1);
    },
    toggleSubTaskChecked: (
      state,
      action: PayloadAction<{
        subTaskId: string;
        isChecked: boolean;
      }>,
    ) => {
      const index = state.tasks.findIndex((x) => x.id === state.selectedRowId);
      if (index < 0) return;

      const payload = action.payload;
      const isChecked = payload.isChecked;
      const subTask = state.tasks[index]!.subTasks?.find(
        (p) => p.id === payload.subTaskId,
      );
      if (subTask == null) return;

      subTask.isChecked = isChecked;
    },
    toggleSelected: (state, action: PayloadAction<{ task: ITask }>) => {
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
      action: PayloadAction<{ task: ITask; isImportant: boolean }>,
    ) => {
      const task = action.payload.task;
      const isImportant = action.payload.isImportant;
      const index = state.tasks.findIndex((x) => x.id === task.id);
      state.tasks[index].isImportant = isImportant;
    },
    toggleChecked: (
      state,
      action: PayloadAction<{ task: ITask; isChecked: boolean }>,
    ) => {
      const task = action.payload.task;
      const isChecked = action.payload.isChecked;
      const filtered = state.tasks.filter((x) => x.id !== task.id);
      const tasks = [...filtered, { ...task, isChecked: isChecked }];
      state.tasks = tasks;
    },
    selectList: (state, action: PayloadAction<IList>) => {
      state.tasks = action.payload.tasks;
      state.listId = action.payload.id;
      state.listName = action.payload.name;
      state.listIcon = action.payload.iconName;
    },
    setSubtasks: (state, action: PayloadAction<ISubTask[]>) => {
      const subTasks = action.payload;
      if (subTasks == null) return;

      state.tasks.forEach((task) => {
        task.subTasks ??= [];
        const subs = subTasks.filter((s) => s.parentId === task.id);

        task.subTasks = subs;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubtasks.fulfilled, (state, action) => {
      state.needSubTasksLoad = false;

      const currentTask = state.tasks.find((x) => x.id === state.selectedRowId);
      if (currentTask == null) return;

      currentTask.subTasks = action.payload;
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const {
  toggleChecked,
  toggleFavorite,
  toggleSelected,
  closeSidebar,
  updateTask,
  createTask,
  deleteTask,
  selectList,
  setSubtasks,
  deleteSubTask,
  toggleSubTaskChecked,
  createSubTask,
} = tasksSlice.actions;
