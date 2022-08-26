import React from "react";
import "./App.css";
import { Tasks } from "../features/tasks/Tasks";
import { Details } from "../features/details/Details";
import List from "../features/groups/List";

function App() {
  return (
    <>
      <List />
      <Tasks />
      <Details />
    </>
  );
}

export default App;
