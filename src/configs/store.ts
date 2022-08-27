import {
  Action,
  AnyAction,
  configureStore,
  Dispatch,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import mainReducer from "../features/main/mainSlice";
import detailsReducer from "../features/details/detailsSlice";
import listsReducer from "../features/lists/listsSlice";
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
    main: mainReducer,
    details: detailsReducer,
    lists: listsReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(consoleLogger as Middleware)
      .concat(detailsListenerMiddleware.middleware),
});

export default store;
