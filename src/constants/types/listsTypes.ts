export interface IList {
  taskId: string;
  name: string;
  Icon?: JSX.Element;
  tasksTotal: number;
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
