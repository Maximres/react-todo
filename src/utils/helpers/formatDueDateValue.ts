import { differenceInCalendarDays, format } from "date-fns";

type ReturnType = "Today" | "Tomorrow" | string | undefined

const formatDueDateValue = (dueDate?: number): ReturnType => {
  let date;
  const weeks = "EEEE";
  const weekMonthDayFormat = "iii, LLL d";
  if (dueDate) {
    const dueDateValue = dueDate;
    const diffDays = differenceInCalendarDays(dueDateValue, new Date());

    const isToday = diffDays === 0;
    const isTomorrow = diffDays === 1;
    const nextWeekOrGreater = diffDays > 1;
    date = isToday
      ? "Today"
      : isTomorrow
        ? "Tomorrow"
        : format(dueDateValue, nextWeekOrGreater ? weekMonthDayFormat : weeks);
  }
  return date;
};

export { formatDueDateValue }