import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";
import { listUpdatedListener } from "./list/listUpdatedListener";
import { listCreatedListener } from "./list/listCreatedListener";
import { groupCreatedListener } from "./group/groupCreatedListener";
import { groupUpdatedListener } from "./group/groupUpdatedListener";
import { groupDeletedListener } from "./group/groupDeletedListener";
import { listUnGroupedListener } from "./list/listUnGroupedListener";
import { listDeletedListener } from "./list/listDeletedListener";
import { listCopiedListener } from "./list/listCopiedListener";
import { totalTasksListener } from "./totalTasksListener";

export const listsListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails =
  listsListenerMiddleware.startListening as AppStartListening;

listUpdatedListener(startAppListeningDetails);
listCreatedListener(startAppListeningDetails);
listUnGroupedListener(startAppListeningDetails);
listDeletedListener(startAppListeningDetails);
listCopiedListener(startAppListeningDetails);

groupDeletedListener(startAppListeningDetails);
groupCreatedListener(startAppListeningDetails);
groupUpdatedListener(startAppListeningDetails);

totalTasksListener(startAppListeningDetails);
