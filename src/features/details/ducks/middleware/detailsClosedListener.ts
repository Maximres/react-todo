import { AppStartListening } from "@/constants/types/redux";
import { reset } from "../detailsSlice";
import { closeSidebar, deleteTask } from "@features/tasks";
import { isAnyOf } from "@reduxjs/toolkit";

export const detailsClosedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: isAnyOf(deleteTask, closeSidebar),
    effect: (action, { dispatch }) => {
      dispatch(reset());
    },
  });
};
