import React from "react";
import Icons from "@/components/AppIcons";
import { format } from "date-fns";
import useReminder from "../../ducks/hooks/useReminder";
import reminderEnum from "@/constants/enums/reminderEnum";
import { useAppSelector } from "@/constants/types/redux";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";
import ReminderContainer from "@/features/details/components/common/CommonDateContainer";
import { ContextMenuReminder } from "../../ducks/constants/contextMenuReminder";
import { ReminderOperations } from "./ReminderOperations";
import { ListItemOperations } from "@/features/lists/ducks/constants/contextMenuOperations";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

const ReminderInput = () => {
  const selectedTask = useAppSelector(currentTaskSelector);
  const [setReminder, clearReminder] = useReminder();
  const hasReminder = selectedTask && selectedTask.remindDate != null;
  const pattern12AmPmFormat = "p";
  const weekMonthDayFormat = "iii, LLL d";
  const reminderText = hasReminder
    ? `Remind me at ${format(selectedTask.remindDate as number, pattern12AmPmFormat)}`
    : "Remind me";
  const reminderDetailedText = hasReminder
    ? format(selectedTask.remindDate as number, weekMonthDayFormat)
    : null;

  const handleClearReminder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    clearReminder(reminderEnum.REMINDER);
  };

  const onItemClick = (type: any, value?: number) => {
    const reminderType = type as ContextMenuReminder;

    switch (reminderType) {
      case ContextMenuReminder.LaterToday:
        setReminder(reminderEnum.LATER_TODAY);
        break;
      case ContextMenuReminder.Tomorrow:
        setReminder(reminderEnum.TOMORROW);
        break;
      case ContextMenuReminder.NextWeek:
        setReminder(reminderEnum.NEXT_WEEK);
        break;
      case ContextMenuReminder.Custom:
        setReminder(reminderEnum.REMINDER, value)
        break;
    }
  };

  if (selectedTask == null) return null;

  return (
    <ReminderOperations
      reminder={selectedTask.remindDate}
      onItemClick={onItemClick}
      render={(props) => (
        <ReminderContainer
          ref={props.anchorRef}
          onClick={props.onClick}
          text={reminderText}
          detailsText={reminderDetailedText}
          hasValue={hasReminder}
          clear={handleClearReminder}
          Icon={<Icons.Reminder />}
        />
      )}
    />
  );
};

export { ReminderInput };
