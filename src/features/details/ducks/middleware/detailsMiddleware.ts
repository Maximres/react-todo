import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";
import { sidebarVisibilityListener } from "../detailsSlice";

export const detailsListenerMiddleware = createListenerMiddleware();
export const taskUpdatesListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails =
  detailsListenerMiddleware.startListening as AppStartListening;

const startAppListeningTaskUpdates =
  taskUpdatesListenerMiddleware.startListening as AppStartListening;

sidebarVisibilityListener(startAppListeningDetails);
