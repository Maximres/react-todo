import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { IDetailsState } from "constants/types/detailsTypes";
import { IRow, ITask } from "constants/types/tasksTypes";

const initialState: IDetailsState = {
  subTasks: [],
  isVisible: false,
};

const detailsSlice = createSlice({
  name: "details",
  initialState: initialState,
  reducers: {

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
  updateDetails,
} = detailsSlice.actions;

export const detailsReducer = detailsSlice.reducer;
