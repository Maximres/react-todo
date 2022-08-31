﻿import { IRow } from "./tasksTypes";

export interface IList {
  id: string;
  name: string;
  groupId: string;
  iconName?: string;
  tasksTotal: number;
  tasks: IRow[];
}

export interface IGroup {
  id: string;
  name: string;
  lists: IList[];
}

export interface IListsState {
  defaultLists: IList[];
  customLists: IList[];
  groups: IGroup[];
}
