import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";

import { selectedTasksListener, subTaskCreatedListener } from "./selectedTasksListener";

export const detailsListenerMiddleware = createListenerMiddleware();
export const taskUpdatesListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails =
  detailsListenerMiddleware.startListening as AppStartListening;

const startAppListeningTaskUpdates =
  taskUpdatesListenerMiddleware.startListening as AppStartListening;

selectedTasksListener(startAppListeningDetails);
subTaskCreatedListener(startAppListeningDetails);
