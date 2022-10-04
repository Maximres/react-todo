import { createContext } from "react";
import { ITask } from "@/constants/types/tasksTypes";

export const ContextMenu = createContext((open: boolean, x: number, y: number, task: ITask) => {});
