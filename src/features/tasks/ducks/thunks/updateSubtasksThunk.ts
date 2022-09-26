import { createAsyncThunk } from "@reduxjs/toolkit";
import ThunkApiActionsTypes from "@/constants/enums/firebaseActionsEnum";
import { dataService } from "@/services/data";
import { RootState } from "@/constants/types/redux";
import { ISubTask } from "@/constants/types/tasksTypes";

export const fetchSubtasks = createAsyncThunk<ISubTask[], void, { state: RootState }>(
  ThunkApiActionsTypes.GetSubtasks,
  async (_, thunkAPI) => {
    const state = thunkAPI.getState().tasks;
    const result = await dataService.getSubtasks(state.selectedRowId as string);
    return result;
  },
);
