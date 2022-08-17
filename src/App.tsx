import React from "react";
import "./App.css";
import { Table } from "./components/main/Table";
import { Details } from "./components/details/Details";
import { IAction, IRow, IState } from "./types/appTypes";

export enum ActionTypes {
  UPDATE_TASK = "UPDATE_TASK",
  CREATE_TASK = "CREATE_TASK",
  TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR",
  TOGGLE_FOCUSED = "TOGGLE_FOCUSED",
  TOGGLE_FAVORITE = "TOGGLE_FAVORITE",
  TOGGLE_CHECKED = "TOGGLE_CHECKED",
  SELECT_ROW = "SELECT_ROW",
}

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionTypes.UPDATE_TASK: {
      const index = state.tasks.findIndex((x) => x.id === action.payload.id);
      const tasks = [...state.tasks];
      tasks[index] = action.payload;
      return { ...state, tasks: tasks };
    }
    case ActionTypes.CREATE_TASK: {
      return {
        ...state,
        tasks: [
          {
            id: Math.random(),
            isChecked: false,
            text: action.payload,
            isFavorite: false,
          } as IRow,
          ...state.tasks,
        ],
      };
    }
    case ActionTypes.TOGGLE_SIDEBAR: {
      if (
        action.payload.task &&
        action.payload.task.id !== state.selectedRowId &&
        state.isSidebarVisible
      )
        return { ...state, selectedRowId: action.payload.task.id };

      const isVisible = action.payload.isSidebarVisible;
      if (!isVisible)
        return { ...state, isSidebarVisible: isVisible, selectedRowId: null };

      return {
        ...state,
        isSidebarVisible: isVisible,
        selectedRowId: action.payload.task.id,
      };
    }
    case ActionTypes.TOGGLE_FOCUSED:
      return { ...state, isFocused: !state.isFocused };
    case ActionTypes.TOGGLE_FAVORITE: {
      const task = action.payload.task;
      const isFavorite = action.payload.isFavorite;
      const index = state.tasks.findIndex((x) => x.id === task.id);
      const tasks = [...state.tasks];
      tasks[index].isFavorite = isFavorite;
      return { ...state, tasks: tasks };
    }
    case ActionTypes.TOGGLE_CHECKED: {
      const task = action.payload.task;
      const isChecked = action.payload.isChecked;
      task.isChecked = isChecked;
      const filtered = state.tasks.filter((x) => x.id !== task.id);
      const tasks = [...filtered, task];
      return { ...state, tasks: tasks };
    }
    case ActionTypes.SELECT_ROW: {
      return { ...state, selectedRowId: action.payload.id };
    }
    default:
      return state;
  }
};

function App() {
  const rowsData = [
    {
      id: Math.random(),
      isChecked: true,
      text: "lorem10",
      isFavorite: true,
      remindDate: null,
      dueDate: null,
      isMyDay: false,
      repeatPeriod: null,
      subTasks: [],
    },
    {
      id: Math.random(),
      isChecked: true,
      text: "lorem11",
      isFavorite: true,
      remindDate: null,
      dueDate: null,
      isMyDay: false,
      repeatPeriod: null,
      subTasks: [],
    },
    {
      id: Math.random(),
      isChecked: false,
      text: "lorem12",
      isFavorite: false,
      remindDate: null,
      dueDate: null,
      repeatPeriod: null,
      isMyDay: false,
      subTasks: [
        {
          id: Math.random(),
          isChecked: false,
          text: "lorem15",
        },
      ],
    },
  ];

  return (
    <>
      <Table />
      <Details />
    </>
  );
}

export default App;
