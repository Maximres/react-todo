import { ITask } from "@/constants/types/tasksTypes";
import { getOrderNumber } from "@/utils/helpers/order";
import assignDeep from "lodash/assignIn";

const newTask = (
  initial: { id: string; parentId: string; text: string },
  overrides?: ITask,
): ITask => {
  const newTask: ITask = {
    parentId: initial.parentId,
    id: initial.id,
    isChecked: false,
    text: initial.text,
    isImportant: false,
    createdDate: Number(new Date()),
    remindDate: undefined,
    isMyDay: false,
    dueDate: undefined,
    note: "",
    subTasks: [],
    order: getOrderNumber(),
  };

  return assignDeep(newTask, overrides);
};

export { newTask };