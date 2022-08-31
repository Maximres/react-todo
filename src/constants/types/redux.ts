import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { TypedStartListening } from "@reduxjs/toolkit";
import store from "@/app/configs/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
