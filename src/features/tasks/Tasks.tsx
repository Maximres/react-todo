import React from "react";
import { CreateTaskFooter } from "@/features/tasks/components/CreateTaskFooter";
import { TasksTableSection } from "@/features/tasks/components/TasksTableSection";
import { ListInfoHeader } from "@/features/tasks/components/ListInfoHeader";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const Tasks = () => {
  return (
    <main className="bg-blueish flex-fill position-relative" style={{ minWidth: 350 }}>
      <DndProvider backend={HTML5Backend}>
        <ListInfoHeader />
        <TasksTableSection />
        <CreateTaskFooter />
      </DndProvider>
    </main>
  );
};

export { Tasks };
