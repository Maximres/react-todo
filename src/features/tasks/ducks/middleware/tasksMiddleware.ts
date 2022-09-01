import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";
import { selectedListListener, subTaskCreatedListener } from "./selectedListListener";

export const tasksListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails =
  tasksListenerMiddleware.startListening as AppStartListening;

selectedListListener(startAppListeningDetails);
subTaskCreatedListener(startAppListeningDetails);
