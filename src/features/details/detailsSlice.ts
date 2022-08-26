import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import {
  IDetailsState,
  ITaskDetails,
} from "../../constants/types/detailsTypes";
import type { AppStartListening } from "../../configs/store";
import { IRow } from "../../constants/types/appTypes";

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
    },
  },
});

const updateDetails = detailsSlice.actions.updateDetails;
export const sidebarVisibilityListener = (
  startListening: AppStartListening,
) => {
  startListening({
    predicate: (action, currentState, originalState) => {
      const currState = currentState.app;
      const prevState = originalState.app;
      return (
        currState.selectedRowId !== prevState.selectedRowId ||
        currState.tasks !== prevState.tasks
      );
    },
    effect: (action, api) => {
      const app = api.getState().app;
      const rowId = app.selectedRowId;
      const task = app.tasks.find((t) => t.id === rowId);
      api.dispatch(updateDetails(task));
    },
  });
};

export const { createSubTask, deleteSubTask, toggleSubTaskChecked } =
  detailsSlice.actions;

export default detailsSlice.reducer;
