import React, { useState } from "react";
import Icons from "@/components/AppIcons";
import { TasksRows } from "./TasksRows";
import _isEmpty from "lodash/isEmpty";
import { ITask } from "@/constants/types/tasksTypes";

type Props = {
  doneTasks: ITask[];
  activeId: string | undefined;
};

const TasksCollapse = ({ doneTasks, activeId }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const hasCheckedTasks = !_isEmpty(doneTasks);

  return (
    <>
      {hasCheckedTasks && (
        <div className="collapse-ml">
          <button
            type="button"
            className="d-flex btn btn-sm btn-light "
            onClick={() => {
              setCollapsed((x) => !x);
            }}
          >
            <span className="px-1 collapse-w">
              <Icons.Angle isCollapsed={collapsed} className="text-black" />
            </span>
            <span className="fw-bolder px-1 ">Completed</span>
            <span className="fw-bolder px-1">{doneTasks.length}</span>
          </button>
        </div>
      )}

      {!collapsed && hasCheckedTasks && (
        <table className="table table-hover table-light">
          <tbody>
            <TasksRows tasks={doneTasks} activeId={activeId} />
          </tbody>
        </table>
      )}
    </>
  );
};

export { TasksCollapse };
