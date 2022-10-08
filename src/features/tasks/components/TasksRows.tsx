import React, { memo, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/constants/types/redux";
import { toggleChecked, toggleSelected, updateTask } from "@/features/tasks";
import { ITask } from "@/constants/types/tasksTypes";
import { Task } from "@/features/tasks/components/Task";
import { getOrderNumber } from "@/utils/helpers/order";

type Props = {
  tasks: ITask[];
  activeId?: string;
};

const TasksComponent = ({ tasks, activeId = "" }: Props): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const [dragEndId, setDragEndId] = useState<string | null>(null);
  const [isDragTop, setIsDragTop] = useState(false);
  const [droppableId, setDroppableId] = useState<string | null>(null);

  useEffect(() => {
    const dropId = droppableId;
    if (dropId == null) return;

    const destItemIndex = tasks.findIndex((x) => x.id === dropId);
    if (destItemIndex < 0) return;
    const destItem = tasks[destItemIndex];

    const placement = isDragTop ? destItemIndex - 1 : destItemIndex + 1;
    let siblingDestItem = tasks[placement];
    let siblingsOrder =
      siblingDestItem != null
        ? siblingDestItem?.order
        : placement >= tasks.length
        ? getOrderNumber()
        : -1;

    const source = tasks.find((x) => x.id === dragEndId) as ITask;

    const meanOrder = (destItem.order + siblingsOrder) / 2.0;

    const srcCopy = { ...source, order: meanOrder };
    dispatch(updateTask({ id: srcCopy.id, task: srcCopy }));
    setDroppableId(null);
    setDragEndId(null);
  }, [dragEndId]);

  const toggleImportant = useCallback((task: ITask) => {
    dispatch(updateTask({ id: task.id, task: { isImportant: !task.isImportant } }));
  }, []);

  const toggleSideBar = useCallback((task: ITask) => {
    dispatch(toggleSelected({ task: task }));
  }, []);

  const handleCheck = useCallback((task: ITask) => {
    dispatch(toggleChecked({ task: task, isChecked: !task.isChecked }));
  }, []);

  const onDragEnd = useCallback((id: string) => {
    setDragEndId(id);
  }, []);

  const handleDrag = useCallback((dropId: string | null, above: boolean) => {
    if (dropId == null && dropId !== droppableId) setDroppableId(null);

    if (droppableId === dropId && isDragTop === above) return;

    setDroppableId(dropId);
    setIsDragTop(above);
  }, []);

  const getBorderClass = useCallback(
    (id: string) => {
      if (droppableId === null) return "";
      if (id !== droppableId) return "";

      return isDragTop ? "drag-top" : "drag-bottom";
    },
    [droppableId, isDragTop],
  );

  if (!tasks) return null;

  const elements = tasks.map((row) => (
    <Task
      key={row.id}
      task={row}
      activeId={activeId}
      toggleImportant={toggleImportant}
      toggleSideBar={toggleSideBar}
      handleCheck={handleCheck}
      handleDrag={handleDrag}
      onDragEnd={onDragEnd}
      borderCn={getBorderClass(row.id)}
    />
  ));

  return <>{elements}</>;
};

export const TasksRows = memo(TasksComponent);
