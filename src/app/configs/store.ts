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
import { listsListenerMiddleware } from "@/features/lists/ducks/middleware/middleware";

const consoleLogger = (api: MiddlewareAPI<Dispatch, any>) => {
  return (next: Dispatch<AnyAction>) => (action: Action) => {
    console.log("will dispatch", action);
    const result = next(action);
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
      .concat(listsListenerMiddleware.middleware)
      .concat(tasksListenerMiddleware.middleware)
      .concat(detailsListenerMiddleware.middleware)
      .concat(consoleLogger as Middleware),
});

export default store;
