import React, { useMemo } from "react";
import { TasksRows } from "@/features/tasks/components/TasksRows";
import { useAppSelector } from "@/constants/types/redux";
import SimpleBar from "simplebar-react";
import { useDrop } from "react-dnd";
import { orderedTasksSelector } from "@/features/tasks/ducks/selectors/orderedTasksSelector";

const TasksSection = () => {
  const tasks = useAppSelector(orderedTasksSelector);
  const selectedId = useAppSelector((s) => s.tasks.selectedRowId) ?? "";

  const goneDoneTasks = useMemo(() => tasks.filter((x) => !x.isChecked), [tasks]);
  const doneTasks = useMemo(() => tasks.filter((x) => x.isChecked), [tasks]);

  const [{ getItem, isOver, canDrop }, drop] = useDrop(() => ({
    accept: "task",
    drop: () => ({ name: "done-table" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      getItem: monitor.getItem(),
    }),
  }));
  const isActive = canDrop && isOver;
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
              <tbody ref={drop}>
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

export { TasksSection };
