import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";
import { listUpdatedListener } from "@/features/lists/ducks/middleware/listUpdatedListener";
import { listCreatedListener } from "@/features/lists/ducks/middleware/listCreatedListener";


export const listsListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails =
  listsListenerMiddleware.startListening as AppStartListening;

listUpdatedListener(startAppListeningDetails);
listCreatedListener(startAppListeningDetails);

