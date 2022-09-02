import { IIdentifier, ITask, ISubTask } from "./tasksTypes";

export interface IDetailsState {
  isVisible: boolean;
  task?: ITask;
  subTasks?: ISubTask[];
}
