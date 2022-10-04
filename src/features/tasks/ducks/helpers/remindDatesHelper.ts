import reminderEnum from "@/constants/enums/reminderEnum";
import { RepeatPeriodType } from "@/constants/types/tasksTypes";
import { add, set } from "date-fns";

type TaskProps = {
  dueDate?: number;
  remindDate?: number;
  repeatPeriod?: RepeatPeriodType;
};

const setRemindDate = (props: Readonly<TaskProps>, dateType: reminderEnum, value?: unknown) => {
  const overrides = { ...props };
  const todayTicks = Number(new Date());
  switch (dateType) {
    case reminderEnum.LATER_TODAY: {
      const fourHoursByNow = set(add(todayTicks, { hours: 4 }), {
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      overrides.remindDate = Number(fourHoursByNow);
      break;
    }
    case reminderEnum.TOMORROW: {
      const tomorrow = set(add(todayTicks, { days: 1 }), {
        hours: 9,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      overrides.remindDate = Number(tomorrow);
      break;
    }
    case reminderEnum.NEXT_WEEK: {
      const nextWeek = set(add(todayTicks, { days: 7 }), {
        hours: 9,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
      overrides.remindDate = Number(nextWeek);
      break;
    }
    case reminderEnum.REMINDER:
      overrides.remindDate = value == null ? undefined : Number(value);
      break;

    case reminderEnum.DUE_TODAY:
      overrides.dueDate = todayTicks;
      break;
    case reminderEnum.DUE_TOMORROW:
      overrides.dueDate = Number(add(todayTicks, { days: 1 }));
      break;
    case reminderEnum.DUE_NEXT_WEEK:
      overrides.dueDate = Number(add(todayTicks, { days: 7 }));
      break;
    case reminderEnum.DUE_DATE:
      overrides.dueDate = value == null ? undefined : Number(value);
      break;
    case reminderEnum.REPEAT_DAILY:
      overrides.repeatPeriod = [365, reminderEnum.REPEAT_DAILY];
      break;
    case reminderEnum.REPEAT_WEEKDAYS:
      overrides.repeatPeriod = [365, reminderEnum.REPEAT_WEEKDAYS];
      break;
    case reminderEnum.REPEAT_WEEKLY:
      overrides.repeatPeriod = [365, reminderEnum.REPEAT_WEEKLY];

      break;
    case reminderEnum.REPEAT_MONTHLY:
      overrides.repeatPeriod = [365, reminderEnum.REPEAT_MONTHLY];
      break;
    case reminderEnum.REPEAT_YEARLY:
      overrides.repeatPeriod = [365, reminderEnum.REPEAT_YEARLY];
      break;
    case reminderEnum.REPEAT: {
      const [repeat, period] = value as RepeatPeriodType;
      overrides.repeatPeriod = [repeat, period];
      break;
    }

    default:
      throw new Error("Argument Out Of Range Error in `UseReminder`");
  }
  return overrides;
};

const clearReminderDate = (props: Readonly<TaskProps>, dateType: reminderEnum) => {
  const overrides = { ...props };
  switch (dateType) {
    case reminderEnum.LATER_TODAY:
    case reminderEnum.TOMORROW:
    case reminderEnum.NEXT_WEEK:
    case reminderEnum.REMINDER:
      overrides.remindDate = undefined;
      break;

    case reminderEnum.DUE_TODAY:
    case reminderEnum.DUE_TOMORROW:
    case reminderEnum.DUE_NEXT_WEEK:
    case reminderEnum.DUE_DATE:
      overrides.dueDate = undefined;
      break;

    case reminderEnum.REPEAT:
    case reminderEnum.REPEAT_DAILY:
    case reminderEnum.REPEAT_WEEKDAYS:
    case reminderEnum.REPEAT_WEEKLY:
    case reminderEnum.REPEAT_MONTHLY:
    case reminderEnum.REPEAT_YEARLY:
      overrides.repeatPeriod = undefined;
      break;
    default:
      throw new Error("Argument Out Of Range Error in `UseReminder`");
  }

  return overrides;
};

export { setRemindDate, clearReminderDate };
