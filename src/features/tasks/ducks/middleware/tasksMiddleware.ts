import { createListenerMiddleware } from "@reduxjs/toolkit";
import { AppStartListening } from "constants/types/redux";
import { selectedListListener } from "./selectedListListener";
import { subTaskCreatedListener } from "./subTaskCreatedListener";
import { taskChangedListener } from "./taskChangedListener";
import { taskDeletedListener } from "@/features/tasks/ducks/middleware/taskDeletedListener";
import { taskCreatedListener } from "@/features/tasks/ducks/middleware/taskCreatedListener";

export const tasksListenerMiddleware = createListenerMiddleware();

const startAppListeningDetails = tasksListenerMiddleware.startListening as AppStartListening;

selectedListListener(startAppListeningDetails);
subTaskCreatedListener(startAppListeningDetails);
taskChangedListener(startAppListeningDetails);
taskDeletedListener(startAppListeningDetails);
taskCreatedListener(startAppListeningDetails);
