import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";
import { selectedListListener } from "./selectedListListener";
import { subTaskCreatedListener } from "./subTaskCreatedListener";
import { taskUpdatedListener } from "./taskUpdatedListener";

export const tasksListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails =
  tasksListenerMiddleware.startListening as AppStartListening;

selectedListListener(startAppListeningDetails);
subTaskCreatedListener(startAppListeningDetails);
taskUpdatedListener(startAppListeningDetails);
