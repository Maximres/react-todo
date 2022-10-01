import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";

import { taskChangedListener } from "./taskChangedListener";
import { subTaskUpdatedListener } from "./subTaskUpdatedListener";
import { detailsClosedListener } from "./detailsClosedListener";
import { subTaskDeletedListener } from "./subTaskDeletedListener";

export const detailsListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails = detailsListenerMiddleware.startListening as AppStartListening;

taskChangedListener(startAppListeningDetails);
subTaskUpdatedListener(startAppListeningDetails);
detailsClosedListener(startAppListeningDetails);
subTaskDeletedListener(startAppListeningDetails);
