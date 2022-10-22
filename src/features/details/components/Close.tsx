import React from "react";
import { useAppDispatch } from "@/constants/types/redux";
import { closeSidebar } from "@/features/tasks";
import { Box, IconButton } from "@mui/material";
import Icons from "@/components/AppIcons";

const Close = () => {
  const dispatch = useAppDispatch();

  const closeDetails = () => {
    dispatch(closeSidebar());
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          mr: "1rem",
          my: "0.5rem",
        }}
      >
        <IconButton onClick={closeDetails} size="medium" sx={{ width: 40, height: 40 }}>
          <Icons.Close />
        </IconButton>
      </Box>
    </>
  );
};

export { Close };
