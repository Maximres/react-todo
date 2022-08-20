import { Dispatch } from "react";
import reminderEnum from "../enums/reminderEnum";

export interface ITask {
  id: string;
  isChecked: boolean;
  text: string | undefined;
  createdDate: number;
}

export interface IRow extends ITask {
  remindDate?: number | null;
  dueDate?: number | null;
  isMyDay: boolean;
  repeatPeriod?: [number, reminderEnum] | null;
  isFavorite: boolean;
  subTasks: ITask[];
}

export interface IState {
  isSidebarVisible: boolean;
  isFocused: boolean;
  tasks: IRow[];
  selectedRowId: string | null;
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
