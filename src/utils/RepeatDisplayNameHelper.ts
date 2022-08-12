import ReminderEnum from "./ReminderEnum";

const RepeatDisplayNameHelper = (type?: ReminderEnum) => {
    switch (type) {
        case ReminderEnum.REPEAT_DAILY:
            return "Daily";
        case ReminderEnum.REPEAT_WEEKDAYS:
            return "Weekdays";
        case ReminderEnum.REPEAT_WEEKLY:
            return "Weekly";
        case ReminderEnum.REPEAT_MONTHLY:
            return "Monthly";
        case ReminderEnum.REPEAT_YEARLY:
            return "Yearly";
        default:
            return null;
    }
}

export default RepeatDisplayNameHelper;