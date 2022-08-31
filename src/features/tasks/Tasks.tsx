import React from "react";
import { EditTaskForm } from "@/features/tasks/components/EditTaskForm";
import { TasksTable } from "@/features/tasks/components/TasksTable";

const Tasks = () => {
  return (
    <main
      className="bg-white flex-fill position-relative"
      style={{ minWidth: 350 }}
    >
      <div className="container-fluid my-5 overflow-auto vh-100">
        <TasksTable />
        <EditTaskForm />
      </div>
    </main>
  );
};

export { Tasks };
