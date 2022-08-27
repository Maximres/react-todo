import React from "react";
import "./App.css";
import { Main } from "../features/tasks/Main";
import { Details } from "../features/details/Details";
import Lists from "../features/lists/Lists";

function App() {
  return (
    <>
      <Lists />
      <Main />
      <Details />
    </>
  );
}

export default App;
