import { AppStartListening } from "@/constants/types/redux";
import { reset } from "../detailsSlice";
import { closeSidebar, deleteTask } from "@features/tasks";
import { isAnyOf } from "@reduxjs/toolkit";

export const detailsClosedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: closeSidebar.match,
    effect: (action, { dispatch }) => {
      dispatch(reset());
    },
  });
};
