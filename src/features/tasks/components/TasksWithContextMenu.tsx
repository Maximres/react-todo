import React, { memo, useCallback, useMemo, useState } from "react";
import { useAppSelector } from "@/constants/types/redux";
import { ITask } from "@/constants/types/tasksTypes";
import { TaskContextMenu } from "@/features/tasks/components/TaskContextMenu";
import { ClickEvent, useMenuState } from "@szhsin/react-menu";
import { orderedTasksSelector } from "../ducks/selectors/orderedTasksSelector";
import { useDrop } from "react-dnd";
import { TasksRows } from "./TasksRows";
import { ContextMenu } from "../ducks/contexts/contextMenu";
import { listsWithoutCurrentSelector } from "../ducks/selectors/listsWithoutCurrentSelector";
import { useTaskItemOperations } from "../ducks/hooks/useTaskItemOperations";
import { TasksCollapse } from "@/features/tasks/components/TasksCollapse";

type Props = {
  boundaryRef: React.RefObject<null>;
};

const TasksWithContextMenuInner = ({ boundaryRef }: Props) => {
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [task, setTask] = useState<ITask>();
  const handleOperation = useTaskItemOperations();
  const selectedId = useAppSelector((s) => s.tasks.selectedRowId);
  const filteredLists = useAppSelector(listsWithoutCurrentSelector);
  const tasks = useAppSelector(orderedTasksSelector);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => ({ name: "done-table" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const onItemClick = (e: ClickEvent) => {
    handleOperation(e.value, task);
  };

  const goneDoneTasks = useMemo(() => tasks.filter((x) => !x.isChecked), [tasks]);
  const doneTasks = useMemo(() => tasks.filter((x) => x.isChecked), [tasks]);

  const toggleContextMenu = useCallback((open: boolean, x: number, y: number, task: ITask) => {
    toggleMenu(open);
    setAnchorPoint({ x: x, y: y });
    setTask(task);
  }, []);

  const activeId = menuProps.state === "open" ? task?.id : selectedId;
  return (
    <div className="row">
      <div className="col-12 pb-2">
        <ContextMenu.Provider value={toggleContextMenu}>
          <table className="table table-hover table-light mb-0">
            <tbody ref={drop}>
              <TasksRows tasks={goneDoneTasks} activeId={activeId} />
            </tbody>
          </table>
          <TasksCollapse doneTasks={doneTasks} activeId={activeId} />
          <div className="my-3" />
        </ContextMenu.Provider>
        <TaskContextMenu
          ref={boundaryRef}
          menuProps={menuProps}
          toggleMenu={toggleMenu}
          anchorPoints={anchorPoint}
          onItemClick={onItemClick}
          lists={filteredLists}
          task={task}
        />
      </div>
    </div>
  );
};

export const TasksWithContextMenu = memo(TasksWithContextMenuInner);
