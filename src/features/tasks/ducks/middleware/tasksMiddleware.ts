import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";
import { selectedListListener } from "./selectedListListener";
import { subTaskCreatedListener } from "./subTaskCreatedListener";
import { taskChangedListener } from "./taskChangedListener";
import { taskDeletedListener } from "./taskDeletedListener";
import { taskCreatedListener } from "./taskCreatedListener";
import { subTaskPromotedListener } from "./subTaskPromotedListener";

export const tasksListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails = tasksListenerMiddleware.startListening as AppStartListening;

selectedListListener(startAppListeningDetails);
subTaskCreatedListener(startAppListeningDetails);
taskChangedListener(startAppListeningDetails);
taskDeletedListener(startAppListeningDetails);
taskCreatedListener(startAppListeningDetails);
subTaskPromotedListener(startAppListeningDetails);
