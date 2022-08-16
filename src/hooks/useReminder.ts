import { useCallback } from "react";
import ReminderEnum from "../utils/ReminderEnum";
import { add, set } from "date-fns";
import { useAppDispatch, useAppSelector } from "../data/hooks";
import { updateTask } from "../data/appSlice";
import selectCurrentRow from "../data/selectors";

const useReminder = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(selectCurrentRow);

  if (selectedTask == null)
    throw new Error(
      "useReminder used in wrong context. selectedTask shouldn't be null",
    );
  const selectedTaskCopy = { ...selectedTask };
  const setReminder = useCallback(
    (dateType: ReminderEnum, value?: unknown) => {
      const todayTicks = Number(new Date());
      switch (dateType) {
        case ReminderEnum.LATER_TODAY: {
          const fourHoursByNow = set(add(todayTicks, { hours: 4 }), {
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          });
          selectedTaskCopy.remindDate = Number(fourHoursByNow);
          break;
        }
        case ReminderEnum.TOMORROW: {
          const tomorrow = set(add(todayTicks, { days: 1 }), {
            hours: 9,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          });
          selectedTaskCopy.remindDate = Number(tomorrow);

          break;
        }
        case ReminderEnum.NEXT_WEEK: {
          const nextWeek = set(add(todayTicks, { days: 7 }), {
            hours: 9,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          });
          selectedTaskCopy.remindDate = Number(nextWeek);
          break;
        }
        case ReminderEnum.REMINDER:
          selectedTaskCopy.remindDate = value == null ? value : Number(value);
          break;
        case ReminderEnum.DUE_TODAY:
          selectedTaskCopy.dueDate = todayTicks;
          break;
        case ReminderEnum.DUE_TOMORROW:
          selectedTaskCopy.dueDate = Number(add(todayTicks, { days: 1 }));
          break;
        case ReminderEnum.DUE_NEXT_WEEK:
          selectedTaskCopy.dueDate = Number(add(todayTicks, { days: 7 }));
          break;
        case ReminderEnum.DUE_DATE:
          selectedTaskCopy.dueDate = value == null ? value : Number(value);
          break;
        case ReminderEnum.REPEAT_DAILY:
          selectedTaskCopy.repeatPeriod = [365, ReminderEnum.REPEAT_DAILY];
          break;
        case ReminderEnum.REPEAT_WEEKDAYS:
          selectedTaskCopy.repeatPeriod = [365, ReminderEnum.REPEAT_WEEKDAYS];
          break;
        case ReminderEnum.REPEAT_WEEKLY:
          selectedTaskCopy.repeatPeriod = [365, ReminderEnum.REPEAT_WEEKLY];

          break;
        case ReminderEnum.REPEAT_MONTHLY:
          selectedTaskCopy.repeatPeriod = [365, ReminderEnum.REPEAT_MONTHLY];
          break;
        case ReminderEnum.REPEAT_YEARLY:
          selectedTaskCopy.repeatPeriod = [365, ReminderEnum.REPEAT_YEARLY];
          break;
        case ReminderEnum.REPEAT:
          selectedTaskCopy.repeatPeriod = [365, value as ReminderEnum];

          break;
        default:
          throw new Error("Argument Out Of Range Error in `UseReminder`");
      }
      dispatch(updateTask(selectedTaskCopy));
    },
    [selectedTask],
  );

  const clearReminder = useCallback(
    (dateType: ReminderEnum) => {
      switch (dateType) {
        case ReminderEnum.LATER_TODAY:
        case ReminderEnum.TOMORROW:
        case ReminderEnum.NEXT_WEEK:
        case ReminderEnum.REMINDER:
          selectedTaskCopy.remindDate = null;
          break;

        case ReminderEnum.DUE_TODAY:
        case ReminderEnum.DUE_TOMORROW:
        case ReminderEnum.DUE_NEXT_WEEK:
        case ReminderEnum.DUE_DATE:
          selectedTaskCopy.dueDate = null;
          break;

        case ReminderEnum.REPEAT:
        case ReminderEnum.REPEAT_DAILY:
        case ReminderEnum.REPEAT_WEEKDAYS:
        case ReminderEnum.REPEAT_WEEKLY:
        case ReminderEnum.REPEAT_MONTHLY:
        case ReminderEnum.REPEAT_YEARLY:
          selectedTaskCopy.repeatPeriod = null;
          break;
        default:
          throw new Error("Argument Out Of Range Error in `UseReminder`");
      }
      dispatch(updateTask(selectedTaskCopy));
    },
    [selectedTask],
  );

  return [setReminder, clearReminder];
};

export default useReminder;
