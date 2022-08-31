import React from "react";
import { TasksRows } from "@/features/tasks/components/TasksRows";
import { useAppSelector } from "@/constants/types/redux";

const TasksTable = () => {
  const tasks = useAppSelector((s) => s.main.tasks);

  return (
    <div className="row px-5">
      <div className="col-12">
        <table className="table table-striped table-hover col-12">
          <tbody>
            <TasksRows tasks={tasks.filter((x) => !x.isChecked)} />
          </tbody>
        </table>
        <table className="table table-striped table-hover table-secondary">
          <tbody>
            <TasksRows tasks={tasks.filter((x) => x.isChecked)} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { TasksTable };
