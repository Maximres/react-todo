import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IDetailsState } from "constants/types/detailsTypes";
import { ITask } from "constants/types/tasksTypes";

const initialState: IDetailsState = {
  subTasks: [],
  isVisible: false,
};

const detailsSlice = createSlice({
  name: "details",
  initialState: initialState,
  reducers: {

    updateDetails: (state, action: PayloadAction<ITask | undefined>) => {
      const task = action.payload;
      state.isVisible = task != null;
      state.task = task;
      if (task) {
        state.subTasks = task.subTasks;
        state.taskId = task.id;
      }
    },
  },
});

export const {
  updateDetails,
} = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;
