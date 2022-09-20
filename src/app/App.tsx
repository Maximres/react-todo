import React, { useEffect } from "react";
import { Tasks } from "@/features/tasks";
import { Details } from "@features/details";
import { Lists } from "@features/lists";
import { useAppDispatch } from "@/constants/types/redux";
import { initialFetch } from "@/utils/thunks/initialFetch";
import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initialFetch());
  }, []);

  return (
    <div className="grid-container vh-100">
      <Lists />
      <Tasks />
      <Details />
    </div>
  );
}

export default App;
