import { useAppDispatch } from "@/constants/types/redux";
import { TaskItemOperations } from "@/features/tasks/ducks/constants/contextMenuOperations";
import { deleteTask, toggleChecked, updateTask } from "@features/tasks";
import { clearReminderDate, setRemindDate } from "@/features/tasks/ducks/helpers/remindDatesHelper";
import reminderEnum from "@/constants/enums/reminderEnum";
import { ITask } from "@/constants/types/tasksTypes";

const isTaskItemOperation = (value: unknown): value is TaskItemOperations => {
  return value != null && Object.values(TaskItemOperations).includes(value as TaskItemOperations);
};

const isTaskItemMoveOperation = (value: unknown): value is [TaskItemOperations.Move, string] => {
  return value != null && Array.isArray(value) && value.length === 2;
};

const useTaskItemOperations = () => {
  const dispatch = useAppDispatch();

  const handleOperation = (operation: any, task?: ITask) => {
    if (isTaskItemMoveOperation(operation)) {
      const [_, groupId] = operation;
      // dispatch(moveItem({ listId: uid, groupId: groupId }));
    }

    if (!isTaskItemOperation(operation) || task == null) {
      return;
    }

    switch (operation) {
      case TaskItemOperations.ToggleMyDay:
        break;
      case TaskItemOperations.ToggleImportance:
        dispatch(
          updateTask({
            id: task.id,
            task: {
              isImportant: !task.isImportant,
            },
          }),
        );
        break;
      case TaskItemOperations.ToggleCheck:
        dispatch(toggleChecked({ task: task, isChecked: !task.isChecked }));
        break;
      case TaskItemOperations.DueToday: {
        const props = setRemindDate({}, reminderEnum.DUE_TODAY);
        dispatch(updateTask({ id: task.id, task: props }));

        break;
      }
      case TaskItemOperations.DueTomorrow: {
        const props = setRemindDate({}, reminderEnum.DUE_TOMORROW);
        dispatch(updateTask({ id: task.id, task: props }));
        break;
      }
      case TaskItemOperations.PickDate:
        break;
      case TaskItemOperations.RemoveDue:
        const props = clearReminderDate({}, reminderEnum.DUE_DATE);
        updateTask({
          id: task.id,
          task: props,
        });
        break;
      case TaskItemOperations.Move:
        break;
      case TaskItemOperations.Delete:
        dispatch(deleteTask(task.id));
        break;
      default:
        break;
    }
  };

  return handleOperation;
};

export { useTaskItemOperations };
