import reminderEnum from "constants/enums/reminderEnum";

const getRepeatName = (type?: reminderEnum) => {
  switch (type) {
    case reminderEnum.REPEAT_DAILY:
      return "Daily";
    case reminderEnum.REPEAT_WEEKDAYS:
      return "Weekdays";
    case reminderEnum.REPEAT_WEEKLY:
      return "Weekly";
    case reminderEnum.REPEAT_MONTHLY:
      return "Monthly";
    case reminderEnum.REPEAT_YEARLY:
      return "Yearly";
    default:
      return null;
  }
};

export default getRepeatName;
