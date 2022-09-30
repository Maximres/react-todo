import { AppStartListening } from "@/constants/types/redux";
import { reset } from "../detailsSlice";
import { closeSidebar } from "@features/tasks";

export const detailsClosedListener = (startListening: AppStartListening) => {
  startListening({
    matcher: closeSidebar.match,
    effect: (action, { dispatch }) => {
      dispatch(reset());
    },
  });
};
