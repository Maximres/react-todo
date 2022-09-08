﻿import React, { useMemo } from "react";
import { TasksRows } from "@/features/tasks/components/TasksRows";
import { useAppSelector } from "@/constants/types/redux";
import SimpleBar from "simplebar-react";

const TasksTableSection = () => {
  const tasks = useAppSelector((s) => s.tasks.tasks);
  const selectedId = useAppSelector((s) => s.tasks.selectedRowId) ?? "";

  const goneDoneTasks = useMemo(
    () => tasks.filter((x) => !x.isChecked),
    [tasks],
  );
  const doneTasks = useMemo(() => tasks.filter((x) => x.isChecked), [tasks]);

  return (
    <section className="vh-100">
      <SimpleBar
        className="h-100 px-5 pb-4 pt-xxl"
        scrollbarMaxSize={200}
        autoHide={false}
        forceVisible={true}
      >
        <div className="row">
          <div className="col-12 pb-2">
            <table className="table table-hover table-light">
              <tbody>
                <TasksRows tasks={goneDoneTasks} selectedId={selectedId} />
              </tbody>
            </table>
            <table className="table table-hover table-light">
              <tbody>
                <TasksRows tasks={doneTasks} selectedId={selectedId} />
              </tbody>
            </table>
          </div>
        </div>
      </SimpleBar>
    </section>
  );
};

export { TasksTableSection };