import reminderEnum from "@/constants/enums/reminderEnum";

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
  repeatPeriod?: [number, string];
};

type SubTaskDto = {
  parentId: string;
  id: string;
  text: string;
  createdDate: number;
  isChecked: boolean;
};

export type { ListDto, TaskDto, SubTaskDto };
