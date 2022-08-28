import React, { useEffect } from "react";
import "./App.css";
import { Main } from "../features/main/Main";
import { Details } from "../features/details/Details";
import Lists from "../features/lists/Lists";
import ApiActions from "../constants/enums/firebaseActionsEnum";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useAppDispatch } from "../constants/types/redux";
import { useDataService } from "../services/data/useDataService";

export const fetchLists = createAsyncThunk(
  ApiActions.InitialFetch,
  async () => {
    const { getLists } = useDataService();
    const result = await getLists();

    return result;
  },
);

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLists());

  }, []);

  return (
    <>
      <Lists />
      <Main />
      <Details />
    </>
  );
}

export default App;
