import { createAsyncThunk } from "@reduxjs/toolkit";
import ThunkApiActionsTypes from "@/constants/enums/firebaseActionsEnum";
import { dataService } from "@/services/data";

export const initialFetch = createAsyncThunk(ThunkApiActionsTypes.InitialFetch, async () => {
  const { getLists, getGroups } = dataService;

  const groupsReq = getGroups();
  const listsReq = getLists();
  const result = await Promise.all([listsReq, groupsReq]);
  return result;
});
