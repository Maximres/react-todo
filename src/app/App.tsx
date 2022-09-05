import React, { useEffect } from "react";
import "./App.css";
import { Tasks } from "@/features/tasks";
import { Details } from "@features/details";
import { Lists } from "@features/lists";
import { useAppDispatch } from "@/constants/types/redux";
import { useDataService } from "@/services/data/useDataService";
import { listsInitialFetch } from "@/utils/thunks/initialFetch";

function App() {
  const dispatch = useAppDispatch();
  const { getListsWithTasks } = useDataService();

  useEffect(() => {
    dispatch(listsInitialFetch(getListsWithTasks));
  }, [getListsWithTasks, dispatch]);

  return (
    <>
      <Lists />
      <Tasks />
      <Details />
    </>
  );
}

export default App;
