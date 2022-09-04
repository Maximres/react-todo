﻿import { ITask } from "./tasksTypes";

export interface IList {
  id: string;
  name: string;
  groupId: string;
  iconName: string;
  tasksTotal: number;
  tasks: ITask[];
}

export interface IGroup {
  id: string;
  name: string;
  lists: IList[];
}

export interface IListsState {
  readonly defaultLists: IList[];
  userLists: IList[];
  groups: IGroup[];
}
