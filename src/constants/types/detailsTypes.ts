import { IIdentifier, IRow } from "./appTypes";

export interface ITaskDetails extends IIdentifier {
  parentId: string;
  isChecked: boolean;
  text?: string;
  createdDate: number;
}

export interface IDetailsState {
  isVisible: boolean;
  task?: IRow;
  subTasks: ITaskDetails[];
}
