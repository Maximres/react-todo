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
    switch (action.type){
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
            
            if (action.payload.task && action.payload.task !== state.selectedRow && state.isSidebarVisible)
                return {...state, selectedRow: action.payload.task}

            const isVisible = action.payload.isSidebarVisible;
            if (!isVisible)
                return {...state, isSidebarVisible: isVisible, selectedRow: null}

            return {...state, isSidebarVisible: isVisible, selectedRow: action.payload.task}
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
            return {...state, selectedRow: action.payload}
        }
        default:
            return state;
    }
}

function App() {

    const rowsData = [
        {id: Math.random(), isChecked: true, text: "lorem10", isFavorite: true, subTasks: []},
        {id: Math.random(), isChecked: true, text: "lorem11", isFavorite: true, subTasks: []},
        {
            id: Math.random(),
            isChecked: false,
            text: "lorem12",
            isFavorite: false,
            remindDate: null,
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
        selectedRow: {}
    })

    return <AppContext.Provider value={{state, dispatch}}>
        <>
            <Table/>
            <Details/>
        </>
    </AppContext.Provider>;
}

export default App;
