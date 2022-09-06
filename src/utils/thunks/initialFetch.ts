import { createAsyncThunk } from "@reduxjs/toolkit";
import ThunkApiActionsTypes from "@/constants/enums/firebaseActionsEnum";
import { dataService } from "@/services/data";
import { IGroup, IList } from "@/constants/types/listsTypes";

export const initialFetch = createAsyncThunk(
  ThunkApiActionsTypes.InitialFetch,
  async () => {
    const { getListsWithTasks, getGroups } = dataService;

    const groupsReq = getGroups();
    const listsReq = getListsWithTasks();
    const groups = await groupsReq;
    const lists = await listsReq;
    return [lists, groups] as [lists: IList[], groups: IGroup[]];
  },
);
