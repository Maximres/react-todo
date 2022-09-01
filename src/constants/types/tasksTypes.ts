import reminderEnum from "constants/enums/reminderEnum";

export interface IIdentifier {
  id: string;
}

export interface ITask extends IIdentifier {
  parentId: string;
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
  isImportant: boolean;
  subTasks?: ITask[]
}

export interface IState {
  listId: string;
  listName: string;
  listIcon: string;
  tasks: IRow[];
  selectedRowId?: string;
}

export interface IAction {
  type: string;
  payload: any;
}
