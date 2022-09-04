import React, { useMemo } from "react";
import { TasksRows } from "@/features/tasks/components/TasksRows";
import { useAppSelector } from "@/constants/types/redux";

const TasksTableSection = () => {
  const tasks = useAppSelector((s) => s.tasks.tasks);
  const selectedId = useAppSelector((s) => s.tasks.selectedRowId) ?? "";

  const goneDoneTasks = useMemo(
    () => tasks.filter((x) => !x.isChecked),
    [tasks],
  );
  const doneTasks = useMemo(() => tasks.filter((x) => x.isChecked), [tasks]);

  return (
    <section className="px-5 pb-5 pt-xxl overflow-auto h-100 stable-scroll">
      <div className="row">
        <div className="col-12">
          <table className="table table-light table-hover col-12">
            <tbody>
              <TasksRows tasks={goneDoneTasks} selectedId={selectedId} />
            </tbody>
          </table>
          <table className="table table-striped table-hover table-secondary">
            <tbody>
              <TasksRows tasks={doneTasks} selectedId={selectedId} />
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export { TasksTableSection };
