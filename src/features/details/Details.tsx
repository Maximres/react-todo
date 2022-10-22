import React from "react";
import Editor from "./components/Editor";
import Reminder from "./components/Reminder";
import MyDay from "./components/MyDay";
import { useAppSelector } from "@/constants/types/redux";
import Footer from "./components/Footer";
import { Note } from "./components/Note";
import SimpleBar from "simplebar-react";
import { Close } from "@/features/details/components/Close";
import { Attachment } from "@/features/details/components/Attachment";
import { Box, styled } from "@mui/material";

const DivDetails = styled("div")(() => ({
  flexGrow: 1,
  overflow: "hidden"
}));

const Aside = styled("aside")(({ theme }) => ({
  overflow: "auto",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.custom.light

}));

export const Details = (): JSX.Element | null => {
  const isVisible = useAppSelector((state) => state.details.isVisible);

  if (!isVisible) return null;

  return (
    <Aside id="details">
      <Close />
      <DivDetails>
        <SimpleBar
          style={{ height: "100%" }}
          scrollbarMaxSize={200}
          autoHide={false}
          forceVisible={false}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              flexShrink: "0",
              height: 1,
            }}
          >
            <Editor />
            <MyDay />
            <Reminder />
            <Attachment />
            <Note />
          </Box>
        </SimpleBar>
      </DivDetails>
      <Footer />
    </Aside>
  );
};
