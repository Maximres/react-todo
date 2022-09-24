import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";
import { listUpdatedListener } from "./listUpdatedListener";
import { listCreatedListener } from "./listCreatedListener";
import { groupCreatedListener } from "./groupCreatedListener";
import { groupUpdatedListener } from "./groupUpdatedListener";
import { groupDeletedListener } from "./groupDeletedListener";
import { ungroupListener } from "./ungroupListener";

export const listsListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails =
  listsListenerMiddleware.startListening as AppStartListening;

listUpdatedListener(startAppListeningDetails);
listCreatedListener(startAppListeningDetails);
groupCreatedListener(startAppListeningDetails);
groupUpdatedListener(startAppListeningDetails);
groupDeletedListener(startAppListeningDetails);
ungroupListener(startAppListeningDetails);
