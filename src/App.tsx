import React, { useReducer } from "react";
import "./App.css";
import { Table } from "./components/Table";
import { Details } from "./components/Details";
import {
  AppContext,
  IAction,
  IAppContextType,
  IRow,
  IState,
} from "./contexts/AppContext";

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

  const initialArgs: IState = {
    isSidebarVisible: false,
    isFocused: false,
    tasks: rowsData,
    selectedRowId: null,
  };
  const [state, dispatch] = useReducer(reducer, initialArgs);

  const contextProps: IAppContextType = {
    state,
    dispatch,
    get selectedRow() {
      const cache: any[] = [];

      return ((cache: any[]) => {
        if (!this.state.selectedRowId) return null;

        const localCacheCreated = (cache = cache || []);
        const cacheElementExits = cache[this.state.selectedRowId];
        const foundElement = (cache[this.state.selectedRowId] =
          this.state.tasks.find((x) => x.id === this.state.selectedRowId));
        return (localCacheCreated && cacheElementExits) || foundElement;
      })(cache);
    },
  };
  return (
    <AppContext.Provider value={contextProps}>
      <>
        <Table />
        <Details />
      </>
    </AppContext.Provider>
  );
}

export default App;
