import React, {useContext} from "react";
import {useCallback} from "react";
import DateTimeEnum from "../utils/DateTimeEnum";
import {add, set} from "date-fns";
import {Types} from "../App";
import {AppContext} from "../contexts/AppContext";

const UseReminder = () => {
    const appContext = useContext(AppContext)
    const selectedTask = appContext.selectedRow;
    const setReminder = useCallback((dateType, value) => {
        const today = new Date();
        let taskCopy;
        switch (dateType) {
            case DateTimeEnum.LATER_TODAY: {
                const fourHoursByNow = set(add(today, {hours: 4}), {minutes: 0, seconds: 0, milliseconds: 0});
                taskCopy = {...selectedTask, remindDate: fourHoursByNow};
                break;
            }
            case DateTimeEnum.TOMORROW: {
                const tomorrow = set(add(today, {days: 1}), {hours: 9, minutes: 0, seconds: 0, milliseconds: 0});
                taskCopy = {...selectedTask, remindDate: tomorrow};
                break;
            }
            case DateTimeEnum.NEXT_WEEK: {
                const nextWeek = set(add(today, {days: 7}), {hours: 9, minutes: 0, seconds: 0, milliseconds: 0});
                taskCopy = {...selectedTask, remindDate: nextWeek};
                break;
            }
            case DateTimeEnum.REMINDER:
                taskCopy = {...selectedTask, remindDate: value};
                break;
            case DateTimeEnum.DUE_TODAY:
                taskCopy = {...selectedTask, dueDate: today};
                break;
            case DateTimeEnum.DUE_TOMORROW:
                taskCopy = {...selectedTask, dueDate: add(today, {days: 1})};
                break;
            case DateTimeEnum.DUE_NEXT_WEEK:
                taskCopy = {...selectedTask, dueDate: add(today, {days: 7})};
                break;
            case DateTimeEnum.DUE_DATE:
                taskCopy = {...selectedTask, dueDate: value};
                break;
            default:
                throw new Error("Argument Out Of Range Error")
        }
        appContext.dispatch({type: Types.UPDATE_TASK, payload: taskCopy})
    }, [appContext])

    const clearReminder = useCallback((dateType) => {
        let taskCopy;
        switch (dateType) {
            case DateTimeEnum.LATER_TODAY:
            case DateTimeEnum.TOMORROW:
            case DateTimeEnum.NEXT_WEEK:
            case DateTimeEnum.REMINDER:
                taskCopy = {...selectedTask, remindDate: null};
                break;
            case DateTimeEnum.DUE_TODAY:
            case DateTimeEnum.DUE_TOMORROW:
            case DateTimeEnum.DUE_NEXT_WEEK:
            case DateTimeEnum.DUE_DATE:
                taskCopy = {...selectedTask, dueDate: null};
                break;
            default:
                taskCopy = {...selectedTask, remindDate: null, dueDate: null};
                break;
        }
        appContext.dispatch({type: Types.UPDATE_TASK, payload: taskCopy})
    }, [appContext])

    return [setReminder, clearReminder];
}

export default UseReminder;