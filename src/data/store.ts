import {
  Action,
  AnyAction,
  configureStore,
  Dispatch,
  MiddlewareAPI,
  ThunkAction,
} from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import { Middleware } from "redux";

const consoleLogger = (
  api: MiddlewareAPI<Dispatch, any>,
) => {
  const { app } = api.getState();
  return (next: Dispatch<AnyAction>) => (action: Action) => {
    console.log("will dispatch", action);
    const result =  next(action);
    console.log("app", app);
    return result;
  };
};

 const store = configureStore({
  reducer: {
    app: appSlice,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(consoleLogger as Middleware),
});


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
