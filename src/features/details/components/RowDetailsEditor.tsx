import React from "react";
import SubRowDetails from "./rows/SubRowDetailsEditor";
import SubRowCreator from "./rows/SubRowDetailsCreator";
import RowDetails from "./rows/RowDetails";

import "@szhsin/react-menu/dist/index.css";


const RowDetailsEditor = () => {
  return (
    <div className="m-3">
      <ul className="list-group">
        <RowDetails />
        <SubRowDetails />
        <SubRowCreator />
      </ul>
    </div>
  );
};

export default RowDetailsEditor;
