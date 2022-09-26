import reminderEnum from "constants/enums/reminderEnum";
import { IIdentifier } from "@/constants/types/stateTypes";

export interface ISubTask extends IIdentifier {
  readonly parentId: string;
  readonly createdDate: number;
  isChecked: boolean;
  text?: string;
  order: number;
}

export interface IReminder {
  remindDate?: number;
  dueDate?: number;
  isMyDay: boolean;
  repeatPeriod?: RepeatPeriodType;
}

export type RepeatPeriodType = [number, keyof typeof reminderEnum];

export interface ITask extends ISubTask, IReminder {
  note?: string;
  isImportant: boolean;
  subTasks?: ISubTask[];
}

export interface IState {
  listId: string;
  listName: string;
  listIcon: string;
  tasks: ITask[];
  selectedRowId?: string;
}

export interface IAction {
  type: string;
  payload: any;
}
