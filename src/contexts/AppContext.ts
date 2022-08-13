import React, { Dispatch } from "react";
import ReminderEnum from "../utils/ReminderEnum";

export interface ITask {
  id: number;
  isChecked: boolean;
  text: string | undefined;
}

export interface IRow extends ITask {
  remindDate: Date | null;
  dueDate: Date | null;
  isMyDay: boolean;
  repeatPeriod: [number, typeof ReminderEnum] | null;
  isFavorite: boolean;
  subTasks: ITask[];
}

export interface IState {
  isSidebarVisible: boolean;
  isFocused: boolean;
  tasks: IRow[];
  selectedRowId: number | null;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IAppContextType {
  state: IState;
  dispatch: Dispatch<IAction>;
  selectedRow: IRow;
}

export const AppContext = React.createContext<IAppContextType>(
  {} as IAppContextType,
);
