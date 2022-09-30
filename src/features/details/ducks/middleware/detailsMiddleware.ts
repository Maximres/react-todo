import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";

import { selectedTasksListener } from "./selectedTasksListener";
import { subTaskUpdatedListener } from "./subTaskUpdatedListener";
import { detailsClosedListener } from "./detailsClosedListener";

export const detailsListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails = detailsListenerMiddleware.startListening as AppStartListening;

selectedTasksListener(startAppListeningDetails);
subTaskUpdatedListener(startAppListeningDetails);
detailsClosedListener(startAppListeningDetails);
