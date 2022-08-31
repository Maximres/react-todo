import React, { useEffect } from "react";
import "./App.css";
import { Main } from "@features/main";
import { Details } from "@features/details";
import { Lists } from "@features/lists";
import ApiActions from "@/constants/enums/firebaseActionsEnum";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/constants/types/redux";
import { useDataService } from "@/services/data/useDataService";
import { IList } from "@/constants/types/listsTypes";

export const fetchLists = createAsyncThunk(
  ApiActions.InitialFetch,
  async (getListsCall: () => Promise<IList[]>) => {
    const result = await getListsCall();
    return result;
  },
);

function App() {
  const dispatch = useAppDispatch();
  const { getLists } = useDataService();

  useEffect(() => {
    dispatch(fetchLists(getLists));
  }, [getLists, dispatch]);

  return (
    <>
      <Lists />
      <Main />
      <Details />
    </>
  );
}

export default App;
