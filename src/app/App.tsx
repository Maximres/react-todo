import React, { useEffect } from "react";
import "./App.css";
import { Tasks } from "@/features/tasks";
import { Details } from "@features/details";
import { Lists } from "@features/lists";
import { useAppDispatch } from "@/constants/types/redux";
import { initialFetch } from "@/utils/thunks/initialFetch";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialFetch());
  }, []);

  return (
    <>
      <Lists />
      <Tasks />
      <Details />
    </>
  );
}

export default App;
