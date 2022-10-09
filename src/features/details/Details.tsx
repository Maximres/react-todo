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

export const Details = (): JSX.Element | null => {
  const isVisible = useAppSelector((state) => state.details.isVisible);

  if (!isVisible) return null;

  return (
    <aside id="details" className="overflow-auto">
      <SimpleBar className="h-100" scrollbarMaxSize={200} autoHide={false} forceVisible={false}>
        <div className="vh-100">
          <div className="h-100 d-flex flex-column align-items-stretch flex-shrink-0 bg-light">
            <Close />
            <Editor />
            <MyDay />
            <Reminder />
            <Attachment />
            {/*todo: replace textarea with MUI multiline*/}
            <Note />
            <Footer />
            <div />
          </div>
        </div>
      </SimpleBar>
    </aside>
  );
};
