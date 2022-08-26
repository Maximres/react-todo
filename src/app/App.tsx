import React from "react";
import "./App.css";
import { Table } from "../features/tasks/Table";
import { Details } from "../features/details/Details";
import List from "../features/groups/List";

function App() {
  return (
    <>
      <List />
      <Table />
      <Details />
    </>
  );
}

export default App;
