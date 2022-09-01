import {
  Action,
  AnyAction,
  configureStore,
  Dispatch,
  Middleware,
  MiddlewareAPI,
} from "@reduxjs/toolkit";
import { tasksReducer } from "@/features/tasks";
import { detailsListenerMiddleware, detailsReducer } from "@features/details";
import { listsReducer } from "@features/lists";
import { tasksListenerMiddleware } from "@/features/tasks/ducks/middleware/tasksMiddleware";

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
    tasks: tasksReducer,
    details: detailsReducer,
    lists: listsReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware()
      .concat(consoleLogger as Middleware)
      .concat(detailsListenerMiddleware.middleware)
      .concat(tasksListenerMiddleware.middleware),
});

export default store;
