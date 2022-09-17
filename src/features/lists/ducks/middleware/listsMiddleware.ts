import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";
import { listUpdatedListener } from "./listUpdatedListener";
import { listCreatedListener } from "./listCreatedListener";
import { groupCreatedListener } from "./groupCreatedListener";
import { groupUpdatedListener } from "./groupUpdatedListener";


export const listsListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails =
  listsListenerMiddleware.startListening as AppStartListening;

listUpdatedListener(startAppListeningDetails);
listCreatedListener(startAppListeningDetails);
groupCreatedListener(startAppListeningDetails);
groupUpdatedListener(startAppListeningDetails);

