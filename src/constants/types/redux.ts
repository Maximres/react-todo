﻿import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Action, ThunkAction, TypedStartListening } from "@reduxjs/toolkit";
import store from "@/app/configs/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
