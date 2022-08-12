import React from "react";
import {useCallback, useContext} from "react";
import ReminderEnum from "../utils/ReminderEnum";
import {add, set} from "date-fns";
import {ActionTypes} from "../App";
import {AppContext} from "../contexts/AppContext";

const UseReminder = () => {
    const appContext = useContext(AppContext)
    const selectedTask = appContext?.selectedRow;
    const setReminder = useCallback((dateType: ReminderEnum, value?: any) => {
        const today = new Date();
        let taskCopy;
        switch (dateType) {
            case ReminderEnum.LATER_TODAY: {
                const fourHoursByNow = set(add(today, {hours: 4}), {minutes: 0, seconds: 0, milliseconds: 0});
                taskCopy = {...selectedTask, remindDate: fourHoursByNow};
                break;
            }
            case ReminderEnum.TOMORROW: {
                const tomorrow = set(add(today, {days: 1}), {hours: 9, minutes: 0, seconds: 0, milliseconds: 0});
                taskCopy = {...selectedTask, remindDate: tomorrow};
                break;
            }
            case ReminderEnum.NEXT_WEEK: {
                const nextWeek = set(add(today, {days: 7}), {hours: 9, minutes: 0, seconds: 0, milliseconds: 0});
                taskCopy = {...selectedTask, remindDate: nextWeek};
                break;
            }
            case ReminderEnum.REMINDER:
                taskCopy = {...selectedTask, remindDate: value};
                break;

            case ReminderEnum.DUE_TODAY:
                taskCopy = {...selectedTask, dueDate: today};
                break;
            case ReminderEnum.DUE_TOMORROW:
                taskCopy = {...selectedTask, dueDate: add(today, {days: 1})};
                break;
            case ReminderEnum.DUE_NEXT_WEEK:
                taskCopy = {...selectedTask, dueDate: add(today, {days: 7})};
                break;
            case ReminderEnum.DUE_DATE:
                taskCopy = {...selectedTask, dueDate: value};
                break;

            case ReminderEnum.REPEAT_DAILY:
                taskCopy = {...selectedTask, repeatPeriod: [365, ReminderEnum.REPEAT_DAILY]};
                break;
            case ReminderEnum.REPEAT_WEEKDAYS:
                taskCopy = {...selectedTask, repeatPeriod: [365, ReminderEnum.REPEAT_WEEKDAYS]};
                break;
            case ReminderEnum.REPEAT_WEEKLY:
                taskCopy = {...selectedTask, repeatPeriod: [365, ReminderEnum.REPEAT_WEEKLY]};
                break;
            case ReminderEnum.REPEAT_MONTHLY:
                taskCopy = {...selectedTask, repeatPeriod: [365, ReminderEnum.REPEAT_MONTHLY]};
                break;
            case ReminderEnum.REPEAT_YEARLY:
                taskCopy = {...selectedTask, repeatPeriod: [365, ReminderEnum.REPEAT_YEARLY]};
                break;
            case ReminderEnum.REPEAT:
                taskCopy = {...selectedTask, repeatPeriod: value};
                break;
            default:
                throw new Error("Argument Out Of Range Error in `UseReminder`")
        }
        appContext.dispatch({type: ActionTypes.UPDATE_TASK, payload: taskCopy})
    }, [appContext])

    const clearReminder = useCallback((dateType: ReminderEnum) => {
        let taskCopy;
        switch (dateType) {
            case ReminderEnum.LATER_TODAY:
            case ReminderEnum.TOMORROW:
            case ReminderEnum.NEXT_WEEK:
            case ReminderEnum.REMINDER:
                taskCopy = {...selectedTask, remindDate: null};
                break;

            case ReminderEnum.DUE_TODAY:
            case ReminderEnum.DUE_TOMORROW:
            case ReminderEnum.DUE_NEXT_WEEK:
            case ReminderEnum.DUE_DATE:
                taskCopy = {...selectedTask, dueDate: null};
                break;

            case ReminderEnum.REPEAT:
            case ReminderEnum.REPEAT_DAILY:
            case ReminderEnum.REPEAT_WEEKDAYS:
            case ReminderEnum.REPEAT_WEEKLY:
            case ReminderEnum.REPEAT_MONTHLY:
            case ReminderEnum.REPEAT_YEARLY:
                taskCopy = {...selectedTask, repeatPeriod: null};
                break;
            default:
                throw new Error("Argument Out Of Range Error in `UseReminder`")
        }
        appContext.dispatch({type: ActionTypes.UPDATE_TASK, payload: taskCopy})
    }, [appContext])

    return [setReminder, clearReminder];
}

export default UseReminder;