import { useCallback } from "react";
import reminderEnum from "@/constants/enums/reminderEnum";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { updateTask } from "@/features/tasks";
import { ITask } from "@/constants/types/tasksTypes";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";
import { clearReminderDate, setRemindDate } from "@/features/tasks/ducks/helpers/remindDatesHelper";

const useReminder = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(currentTaskSelector);

  if (selectedTask == null)
    throw new Error("useReminder used in wrong context. selectedTask shouldn't be null");

  const setReminder = useCallback(
    (dateType: reminderEnum, value?: unknown) => {
      const overrides: Partial<ITask> = {
        dueDate: selectedTask.dueDate,
        remindDate: selectedTask.remindDate,
        repeatPeriod: selectedTask.repeatPeriod,
      };
      const props = setRemindDate(overrides, dateType, value);
      dispatch(updateTask({ id: selectedTask.id, task: props }));
    },
    [selectedTask],
  );

  const clearReminder = useCallback(
    (dateType: reminderEnum) => {
      const overrides: Partial<ITask> = {
        dueDate: selectedTask.dueDate,
        remindDate: selectedTask.remindDate,
        repeatPeriod: selectedTask.repeatPeriod,
      };
      const props = clearReminderDate(overrides, dateType);
      dispatch(updateTask({ id: selectedTask.id, task: props }));
    },
    [selectedTask],
  );

  const ret: [setReminder: typeof setReminder, clearReminder: typeof clearReminder] = [
    setReminder,
    clearReminder,
  ];
  return ret;
};

export default useReminder;
