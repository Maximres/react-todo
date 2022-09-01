import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IDetailsState, ITaskDetails } from "constants/types/detailsTypes";
import { IRow } from "constants/types/tasksTypes";

const initialState: IDetailsState = {
  subTasks: [],
  isVisible: false,
};

const detailsSlice = createSlice({
  name: "details",
  initialState: initialState,
  reducers: {
    createSubTask: {
      reducer(
        state,
        action: PayloadAction<{
          parentId: string;
          text: string;
          subId: string;
        }>,
      ) {
        state.subTasks ??= [];

        const newSubTask: ITaskDetails = {
          id: action.payload.subId,
          isChecked: false,
          text: action.payload.text,
          createdDate: Number(new Date()),
          parentId: action.payload.parentId,
        };

        state.subTasks.push(newSubTask);
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
      if (state.subTasks == null) return;

      const index = state.subTasks.findIndex((x) => x.id === action.payload);

      state.subTasks.splice(index, 1);
    },
    toggleSubTaskChecked: (
      state,
      action: PayloadAction<{
        subTaskId: string;
        isChecked: boolean;
      }>,
    ) => {
      if (state.subTasks == null) return;

      const payload = action.payload;
      const isChecked = payload.isChecked;
      const subTask = state.subTasks.find((p) => p.id === payload.subTaskId);
      if (subTask == null) return;

      subTask.isChecked = isChecked;
    },
    updateDetails: (state, action: PayloadAction<IRow | undefined>) => {
      const task = action.payload;
      state.isVisible = task != null;
      state.task = task;
      if (task) {
        state.subTasks = task.subTasks;
      }
    },
  },
});

export const {
  createSubTask,
  deleteSubTask,
  toggleSubTaskChecked,
  updateDetails,
} = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;
