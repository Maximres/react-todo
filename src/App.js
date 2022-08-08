import React, {useReducer, useState} from "react";
import './App.css';
import {Table} from "./components/Table";
import {Details} from "./components/Details";
import {AppContext} from "./contexts/AppContext";

export const Types = {
    UPDATE_TASK: "UPDATE_TASK",
    CREATE_TASK: "CREATE_TASK",
    TOGGLE_SIDEBAR: "TOGGLE_SIDEBAR",
    TOGGLE_FOCUSED: "TOGGLE_FOCUSED",
    TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
    TOGGLE_CHECKED: "TOGGLE_CHECKED",
    SELECT_ROW: "SELECT_ROW",
}

const reducer = (state, action) => {
    switch (action.type) {
        case Types.UPDATE_TASK: {

            const index = state.tasks.findIndex(x => x.id === action.payload.id);
            const tasks = [...state.tasks]
            tasks[index] = action.payload;
            return {...state, tasks: tasks}
        }
        case Types.CREATE_TASK: {
            return {
                ...state,
                tasks: [{
                    id: Math.random(),
                    isChecked: false,
                    text: action.payload,
                    isFavorite: false
                }, ...state.tasks]
            }
        }
        case Types.TOGGLE_SIDEBAR: {

            if (action.payload.task && action.payload.task.id !== state.selectedRowId && state.isSidebarVisible)
                return {...state, selectedRowId: action.payload.task.id}

            const isVisible = action.payload.isSidebarVisible;
            if (!isVisible)
                return {...state, isSidebarVisible: isVisible, selectedRowId: null}

            return {...state, isSidebarVisible: isVisible, selectedRowId: action.payload.task.id}
        }
        case Types.TOGGLE_FOCUSED:
            return {...state, isFocused: !state.isFocused}
        case Types.TOGGLE_FAVORITE: {
            const task = action.payload.task;
            const isFavorite = action.payload.isFavorite;
            const index = state.tasks.findIndex(x => x.id === task.id);
            const tasks = [...state.tasks]
            tasks[index].isFavorite = isFavorite;
            return {...state, tasks: tasks}
        }
        case Types.TOGGLE_CHECKED: {
            const task = action.payload.task;
            const isChecked = action.payload.isChecked;
            task.isChecked = isChecked;
            const filtered = state.tasks.filter(x => x.id !== task.id);
            const tasks = [...filtered, task];
            return {...state, tasks: tasks}
        }
        case Types.SELECT_ROW: {
            return {...state, selectedRowId: action.payload.id}
        }
        default:
            return state;
    }
}

function App() {

    const rowsData = [
        {id: Math.random(), isChecked: true, text: "lorem10", isFavorite: true, remindDate: null, dueDate: null, subTasks: []},
        {id: Math.random(), isChecked: true, text: "lorem11", isFavorite: true, remindDate: null, dueDate: null, subTasks: []},
        {
            id: Math.random(),
            isChecked: false,
            text: "lorem12",
            isFavorite: false,
            remindDate: null,
            dueDate: null,
            subTasks: [{
                id: Math.random(),
                isChecked: false,
                text: "lorem15"
            }]
        },
    ];

    const [state, dispatch] = useReducer(reducer, {
        isSidebarVisible: false,
        isFocused: false,
        tasks: rowsData,
        selectedRowId: null,

    })

    const contextProps = {
        state,
        dispatch,
        get selectedRow() {
            if (!this.state.selectedRowId)
                return null;

            const localCacheCreated = this.cache = this.cache || [];
            const cacheElementExits = this.cache[this.state.selectedRowId];
            const foundElement = this.cache[this.state.selectedRowId] = this.state.tasks.find(x => x.id === this.state.selectedRowId);
            return (localCacheCreated && cacheElementExits) || foundElement;
        }
    };
    return <AppContext.Provider value={contextProps}>
        <>
            <Table/>
            <Details/>
        </>
    </AppContext.Provider>;
}

export default App;
