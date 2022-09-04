import { ISubTask, ITask } from "./tasksTypes";

export interface IDetailsState {
  isVisible: boolean;
  task?: ITask;
  taskId?: string;
  subTasks?: ISubTask[];
}
