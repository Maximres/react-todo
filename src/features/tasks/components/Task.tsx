import cn from "classnames";
import Icons from "@/components/AppIcons";
import React, { memo, useRef } from "react";
import { ITask } from "@/constants/types/tasksTypes";
import { useDrag, useDrop } from "react-dnd";

type Props = {
  task: ITask;
  selectedId: string;
  handleCheck: (task: ITask) => void;
  toggleImportant: (task: ITask) => void;
  toggleSideBar: (task: ITask) => void;
  handleDrag: (dropId: string | null, above: boolean) => void;
  onDragEnd: (id: string) => void;
  borderCn?: string;
};

const TaskComponent = ({
  task,
  selectedId,
  toggleSideBar,
  handleCheck,
  toggleImportant,
  handleDrag,
  borderCn,
  onDragEnd,
}: Props) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [, drag] = useDrag(() => ({
    type: "task",
    item: () => ({ id: task.id, type: "task" }),
    end: (item) => {
      onDragEnd(item.id);
    },
  }));

  const [, drop] = useDrop(() => ({
    accept: "task",
    hover: (item: any, monitor) => {
      if (!ref.current) return;

      const dragId = item.id;
      const dropId = task.id;

      // hovering itself
      if (dragId === dropId) {
        handleDrag(null, false);
        return;
      }

      const dropRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (dropRect.bottom - dropRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const clientPositionY = clientOffset?.y ?? 0;
      const hoverClientY = clientPositionY - dropRect.top;
      const movingUpwards = hoverClientY <= hoverMiddleY;

      handleDrag(dropId, movingUpwards);
    },
  }));

  drag(drop(ref));

  return (
    <tr
      ref={ref}
      className={cn(
        "row my-1",
        {
          "table-active": selectedId === task.id,
        },
        [borderCn],
      )}
      onClick={() => toggleSideBar(task)}
    >
      <td className="px-1 col-1 col-check-width">
        <div className="d-flex justify-content-center align-items-center">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onClick={(e) => e.stopPropagation()}
              checked={task.isChecked}
              onChange={() => handleCheck(task)}
            />
          </div>
        </div>
      </td>
      <td className="px-1 col">{task.text}</td>
      <td className="px-1 col-1">
        <Icons.Favorite
          isImportant={task.isImportant}
          onClick={(e: any) => {
            e.stopPropagation();
            toggleImportant(task);
          }}
        />
      </td>
    </tr>
  );
};

export const Task = memo(TaskComponent);
