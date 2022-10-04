import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { fetchSubtasks } from "@/features/tasks";
import assignDeep from "lodash/assignIn";
import type { IState, ISubTask, ITask } from "@/constants/types/tasksTypes";
import { selectList } from "@features/lists";
import { getOrderNumber } from "@/utils/helpers/order";
import { newTask } from "@/features/tasks/ducks/helpers/taskCreator";

const initialState: IState = {
  tasks: [],
  listId: "",
  listIcon: "",
  listName: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTask: (state, action: PayloadAction<{ id: string; task: Partial<Omit<ITask, "id">> | ITask }>) => {
      const index = state.tasks.findIndex((x) => x.id === action.payload.id);
      if (index < 0) return;
      const task = state.tasks[index];
      state.tasks[index] = assignDeep(<ITask>{}, task, action.payload.task );
    },
    createTask: {
      reducer(state, action: PayloadAction<{ text: string; id: string }>) {
        const task = newTask({
          id: action.payload.id,
          parentId: state.listId,
          text: action.payload.text,
        });
        state.tasks.push(task);
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
        const parentTask = state.tasks.find((t) => t.id === action.payload.parentId);
        if (parentTask == null) return;

        const newSubTask: ISubTask = {
          id: action.payload.subId,
          isChecked: false,
          text: action.payload.text,
          createdDate: Number(new Date()),
          parentId: action.payload.parentId,
          order: getOrderNumber(),
        };
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

      const subIndex = state.tasks[index]!.subTasks?.findIndex((x) => x.id === action.payload);
      if (subIndex == null || subIndex < 0) return;

      state.tasks[index]!.subTasks!.splice(subIndex, 1);
    },
    updateSubTask: (
      state,
      action: PayloadAction<{
        subId: string;
        subTask: ITask;
      }>,
    ) => {
      const taskIndex = state.tasks.findIndex((x) => x.id === state.selectedRowId);
      if (taskIndex < 0) return;

      const { subId, subTask } = action.payload;
      const subTasks = state.tasks[taskIndex]!.subTasks;
      const subTaskIndex = subTasks?.findIndex((p) => p.id === subId);
      if (subTaskIndex == null || subTaskIndex < 0) return;

      subTasks![subTaskIndex] = assignDeep({}, subTasks![subTaskIndex], subTask);
    },
    promoteSubTask: (state, action: PayloadAction<string>) => {
      const taskIndex = state.tasks.findIndex((x) => x.id === state.selectedRowId);
      if (taskIndex < 0) return;

      const subId = action.payload;
      const subTasks = state.tasks[taskIndex]!.subTasks;
      const subTaskIndex = subTasks?.findIndex((p) => p.id === subId);
      if (subTaskIndex == null || subTaskIndex < 0) return;
      const subItems = subTasks!.splice(subTaskIndex, 1);
      if (subItems.length <= 0) return;

      const newTaskItem = subItems[0];

      const promotedSubTask = newTask({
        id: newTaskItem.id,
        parentId: state.listId,
        text: newTaskItem.text ?? "",
      });

      state.tasks.push(promotedSubTask);
    },
    toggleSelected: (state, action: PayloadAction<{ task: ITask }>) => {
      const currentId = action.payload.task.id;
      const toggleWithoutClose = currentId !== state.selectedRowId && state.selectedRowId != null;
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
    /*    toggleFavorite: (state, action: PayloadAction<{ task: ITask; isImportant: boolean }>) => {
          const task = action.payload.task;
          const isImportant = action.payload.isImportant;
          const index = state.tasks.findIndex((x) => x.id === task.id);
          state.tasks[index].isImportant = isImportant;
        },*/
    toggleChecked: (state, action: PayloadAction<{ task: ITask; isChecked: boolean }>) => {
      const task = action.payload.task;
      const isChecked = action.payload.isChecked;
      const filtered = state.tasks.filter((x) => x.id !== task.id);
      const tasks = [...filtered, { ...task, isChecked: isChecked }];
      state.tasks = tasks;
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
    setTasks: (state, action: PayloadAction<ITask[]>) => {
      const tasks = action.payload;
      if (tasks == null) {
        state.tasks = [];
        return;
      }

      state.tasks = tasks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubtasks.fulfilled, (state, action) => {
      const currentTask = state.tasks.find((x) => x.id === state.selectedRowId);
      if (currentTask == null) return;

      currentTask.subTasks = action.payload;
    });
    builder.addCase(selectList, (state, action) => {
      const list = action.payload;
      if (list == null) {
        state.selectedRowId = undefined;
        state.tasks = [];
        state.listId = "";
        return;
      }

      const sameList = state.listId === list.id;
      if (sameList) return;

      state.tasks = list.tasks;
      state.listId = list.id;
      state.listName = list.name;
      state.listIcon = list.iconName;
    });
  },
});

export const tasksReducer = tasksSlice.reducer;
export const {
  toggleChecked,
  toggleSelected,
  closeSidebar,
  updateTask,
  createTask,
  deleteTask,
  setTasks,
  setSubtasks,
  deleteSubTask,
  createSubTask,
  updateSubTask,
  promoteSubTask,
} = tasksSlice.actions;
