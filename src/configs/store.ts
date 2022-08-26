﻿import {
  Action,
  AnyAction,
  configureStore,
  Dispatch,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import appSlice from "../features/tasks/tasksSlice";
import detailsSlice from "../features/details/detailsSlice";
import { Middleware } from "redux";
import { detailsListenerMiddleware } from "../features/details/detailsMiddleware";

const consoleLogger = (api: MiddlewareAPI<Dispatch, any>) => {
  const { app } = api.getState();
  return (next: Dispatch<AnyAction>) => (action: Action) => {
    console.log("will dispatch", action);
    const result = next(action);
    console.log("app", app);
    return result;
  };
};

const store = configureStore({
  reducer: {
    app: appSlice,
    details: detailsSlice,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(consoleLogger as Middleware)
      .concat(detailsListenerMiddleware.middleware),
});

export default store;
