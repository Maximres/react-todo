import reminderEnum from "../enums/reminderEnum";

export interface IIdentifier {
  id: string;
}

export interface ITask extends IIdentifier {
  isChecked: boolean;
  text?: string;
  createdDate: number;
}

export interface IReminder {
  remindDate?: number;
  dueDate?: number;
  isMyDay: boolean;
  repeatPeriod?: [number, keyof typeof reminderEnum];
}

export interface IRow extends ITask, IReminder {
  isFavorite: boolean;
  subTasks: ITask[]; // todo remove
}

export interface IState {
  tasks: IRow[];
  selectedRowId?: string;
}

export interface IAction {
  type: string;
  payload: any;
}
