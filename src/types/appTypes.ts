import { Dispatch } from "react";
import ReminderEnum from "../utils/ReminderEnum";

export interface ITask {
  id: number;
  isChecked: boolean;
  text: string | undefined;
  createdDate: number;
}

export interface IRow extends ITask {
  remindDate: number | null | undefined;
  dueDate: number | null | undefined;
  isMyDay: boolean;
  repeatPeriod: [number, ReminderEnum] | null;
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
