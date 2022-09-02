import reminderEnum from "constants/enums/reminderEnum";

export interface IIdentifier {
  id: string;
}

export interface ISubTask extends IIdentifier {
  parentId: string;
  isChecked: boolean;
  text?: string;
  createdDate: number;
  isNewOne?: boolean
}

export interface IReminder {
  remindDate?: number;
  dueDate?: number;
  isMyDay: boolean;
  repeatPeriod?: [number, keyof typeof reminderEnum];
}

export interface ITask extends ISubTask, IReminder {
  isImportant: boolean;
  subTasks?: ISubTask[]
}

export interface IState {
  listId: string;
  listName: string;
  listIcon: string;
  tasks: ITask[];
  selectedRowId?: string;
  needSubTasksLoad: boolean;
}

export interface IAction {
  type: string;
  payload: any;
}
