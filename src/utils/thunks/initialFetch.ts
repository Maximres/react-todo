import { createAsyncThunk } from "@reduxjs/toolkit";
import ThunkApiActionsTypes from "@/constants/enums/firebaseActionsEnum";
import { IList } from "@/constants/types/listsTypes";

export const listsInitialFetch = createAsyncThunk(
  ThunkApiActionsTypes.InitialFetch,
  async (getListsCall: () => Promise<IList[]>) => {
    const result = await getListsCall();
    return result;
  },
);