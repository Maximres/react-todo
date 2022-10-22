import React from "react";
import SubRowDetails from "./rows/SubRowDetailsEditor";
import SubRowCreator from "./rows/SubRowDetailsCreator";
import RowDetails from "./rows/RowDetails";
import { Box, Paper } from "@mui/material";

import "@szhsin/react-menu/dist/index.css";

const Editor = () => {
  return (
    <>
      <Box mx="1rem" mb="0.5rem">
        <Paper variant="outlined">
          <RowDetails />
          <SubRowDetails />
          <SubRowCreator />
        </Paper>
      </Box>
    </>
  );
};

export default Editor;
