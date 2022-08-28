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
  createdDate: number;
  isChecked: boolean;
  isImportant: boolean;
  subTasks: SubTaskDto[];
  isMyDay: boolean;

  remindDate?: number;
  dueDate?: number;
  repeatPeriodType?: string;
  repeatPeriodTimes?: number;
};

type SubTaskDto = {
  parentId: string;
  id: string;
  text: string;
  createdDate: number;
};

export type { ListDto, TaskDto, SubTaskDto };
