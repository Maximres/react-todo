import { createAsyncThunk } from "@reduxjs/toolkit";
import ApiActions from "@/constants/enums/firebaseActionsEnum";
import { dataService } from "@/services/data";
import { ITask } from "@/constants/types/tasksTypes";
import { RootState } from "@/constants/types/redux";

export const fetchSubtasks = createAsyncThunk<
  ITask[],
  void,
  { state: RootState }
>(ApiActions.UpdateSubtask, async (_, thunkAPI) => {
  const state = thunkAPI.getState().tasks;
  const result = await dataService.getSubtasks(state.selectedRowId as string);
  return result;
});
