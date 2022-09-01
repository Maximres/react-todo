import { IIdentifier, IRow, ITask } from "./tasksTypes";

export interface IDetailsState {
  isVisible: boolean;
  task?: IRow;
  subTasks?: ITask[];
}
