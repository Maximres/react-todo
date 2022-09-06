type ListDto = {
  id: string;
  name: string;
  iconName: string;
  groupId: string;
  tasks: TaskDto[];
};

type TaskDto = {
  parentId: string;
  id: string;
  text: string;
  note: string;
  createdDate: number;
  isChecked: boolean;
  isImportant: boolean;

  subTasks?: SubTaskDto[];

  isMyDay: boolean;
  remindDate: number;
  dueDate: number;
  repeatPeriod: RepeatPeriod;
};

type RepeatPeriod = [repeats: number, period: string];

type SubTaskDto = {
  parentId: string;
  id: string;
  text: string;
  createdDate: number;
  isChecked: boolean;
};

type GroupDto = {
  id: string;
  name: string;
  order: number;
};

export type { ListDto, TaskDto, SubTaskDto, RepeatPeriod, GroupDto };
