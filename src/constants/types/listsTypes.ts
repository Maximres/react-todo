import { ITask } from "./tasksTypes";
import { IOrderable } from "@/constants/types/stateTypes";

export interface IList extends IOrderable {
  readonly id: string;
  name: string;
  groupId?: string;
  iconName: string;
  totalTasks: number;
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
  selectedListId?: string;

  editItemId?: string;
}
