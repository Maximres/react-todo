import { useCallback } from "react";
import reminderEnum from "@/constants/enums/reminderEnum";
import { add, set } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { updateTask } from "@/features/tasks";
import { selectCurrentTask } from "@/utils/selectors/selectCurrentRow";

const useReminder = () => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(selectCurrentTask);

  if (selectedTask == null)
    throw new Error(
      "useReminder used in wrong context. selectedTask shouldn't be null",
    );
  const selectedTaskCopy = { ...selectedTask };
  const setReminder = useCallback(
    (dateType: reminderEnum, value?: unknown) => {
      const todayTicks = Number(new Date());
      switch (dateType) {
        case reminderEnum.LATER_TODAY: {
          const fourHoursByNow = set(add(todayTicks, { hours: 4 }), {
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          });
          selectedTaskCopy.remindDate = Number(fourHoursByNow);
          break;
        }
        case reminderEnum.TOMORROW: {
          const tomorrow = set(add(todayTicks, { days: 1 }), {
            hours: 9,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          });
          selectedTaskCopy.remindDate = Number(tomorrow);

          break;
        }
        case reminderEnum.NEXT_WEEK: {
          const nextWeek = set(add(todayTicks, { days: 7 }), {
            hours: 9,
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
          });
          selectedTaskCopy.remindDate = Number(nextWeek);
          break;
        }
        case reminderEnum.REMINDER:
          selectedTaskCopy.remindDate =
            value == null ? undefined : Number(value);
          break;
        case reminderEnum.DUE_TODAY:
          selectedTaskCopy.dueDate = todayTicks;
          break;
        case reminderEnum.DUE_TOMORROW:
          selectedTaskCopy.dueDate = Number(add(todayTicks, { days: 1 }));
          break;
        case reminderEnum.DUE_NEXT_WEEK:
          selectedTaskCopy.dueDate = Number(add(todayTicks, { days: 7 }));
          break;
        case reminderEnum.DUE_DATE:
          selectedTaskCopy.dueDate = value == null ? undefined : Number(value);
          break;
        case reminderEnum.REPEAT_DAILY:
          selectedTaskCopy.repeatPeriod = [365, reminderEnum.REPEAT_DAILY];
          break;
        case reminderEnum.REPEAT_WEEKDAYS:
          selectedTaskCopy.repeatPeriod = [365, reminderEnum.REPEAT_WEEKDAYS];
          break;
        case reminderEnum.REPEAT_WEEKLY:
          selectedTaskCopy.repeatPeriod = [365, reminderEnum.REPEAT_WEEKLY];

          break;
        case reminderEnum.REPEAT_MONTHLY:
          selectedTaskCopy.repeatPeriod = [365, reminderEnum.REPEAT_MONTHLY];
          break;
        case reminderEnum.REPEAT_YEARLY:
          selectedTaskCopy.repeatPeriod = [365, reminderEnum.REPEAT_YEARLY];
          break;
        case reminderEnum.REPEAT:
          selectedTaskCopy.repeatPeriod = [365, value as reminderEnum];

          break;
        default:
          throw new Error("Argument Out Of Range Error in `UseReminder`");
      }
      dispatch(updateTask(selectedTaskCopy));
    },
    [selectedTask],
  );

  const clearReminder = useCallback(
    (dateType: reminderEnum) => {
      switch (dateType) {
        case reminderEnum.LATER_TODAY:
        case reminderEnum.TOMORROW:
        case reminderEnum.NEXT_WEEK:
        case reminderEnum.REMINDER:
          selectedTaskCopy.remindDate = undefined;
          break;

        case reminderEnum.DUE_TODAY:
        case reminderEnum.DUE_TOMORROW:
        case reminderEnum.DUE_NEXT_WEEK:
        case reminderEnum.DUE_DATE:
          selectedTaskCopy.dueDate = undefined;
          break;

        case reminderEnum.REPEAT:
        case reminderEnum.REPEAT_DAILY:
        case reminderEnum.REPEAT_WEEKDAYS:
        case reminderEnum.REPEAT_WEEKLY:
        case reminderEnum.REPEAT_MONTHLY:
        case reminderEnum.REPEAT_YEARLY:
          selectedTaskCopy.repeatPeriod = undefined;
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
