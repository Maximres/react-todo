import React from "react";
import "./App.css";
import { Table } from "../components/table/Table";
import { Details } from "../components/details/Details";
import List from "../components/list/List";

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
