import React from "react";
import { CreateTaskFooter } from "@/features/tasks/components/CreateTaskFooter";
import { TasksTableSection } from "@/features/tasks/components/TasksTableSection";
import { ListInfoHeader } from "@/features/tasks/components/ListInfoHeader";

const Tasks = () => {
  return (
    <main
      className="bg-blueish flex-fill position-relative"
      style={{ minWidth: 350 }}
    >
      <ListInfoHeader />
      <TasksTableSection />
      <CreateTaskFooter />

    </main>
  );
};

export { Tasks };
