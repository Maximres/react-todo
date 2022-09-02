import { createAsyncThunk } from "@reduxjs/toolkit";
import ThunkApiActionsType from "@/constants/enums/firebaseActionsEnum";
import { dataService } from "@/services/data";
import { ISubTask } from "@/constants/types/tasksTypes";
import { RootState } from "@/constants/types/redux";

export const fetchSubtasks = createAsyncThunk<
  ISubTask[],
  void,
  { state: RootState }
>(ThunkApiActionsType.GetSubtasks, async (_, thunkAPI) => {
  const state = thunkAPI.getState().tasks;
  const result = await dataService.getSubtasks(state.selectedRowId as string);
  return result;
});
