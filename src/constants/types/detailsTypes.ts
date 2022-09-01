import { IIdentifier, IRow } from "./tasksTypes";

export interface ITaskDetails extends IIdentifier {
  parentId: string;
  isChecked: boolean;
  text?: string;
  createdDate: number;
}

export interface IDetailsState {
  isVisible: boolean;
  task?: IRow;
  subTasks?: ITaskDetails[];
}
