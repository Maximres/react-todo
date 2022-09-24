import { ITask } from "./tasksTypes";
import { IOrderable } from "@/constants/types/stateTypes";

export interface IList extends IOrderable {
  readonly id: string;
  name: string;
  groupId?: string;
  iconName: string;
  tasksTotal: number;
  tasks: ITask[];
  selectedTicks?: number;
}

export interface IGroup extends IOrderable {
  id: string;
  name: string;
}

export interface IListsState {
  readonly defaultLists: IList[];
  userLists: IList[];
  groups: IGroup[];
  selectedList?: IList;

  editItemId?: string
}
