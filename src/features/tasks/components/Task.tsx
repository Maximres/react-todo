import cn from "classnames";
import Icons from "@/components/AppIcons";
import React, { memo, useRef } from "react";
import { ITask } from "@/constants/types/tasksTypes";
import { useDrag, useDrop } from "react-dnd";
import { useSortableTasks } from "@/features/tasks/ducks/hooks/useSortableTasks";

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
  const [ref] = useSortableTasks(task.id, onDragEnd, handleDrag);

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
