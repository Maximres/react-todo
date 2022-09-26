import React from "react";
import { TasksFooter } from "@/features/tasks/components/TasksFooter";
import { TasksSection } from "@/features/tasks/components/TasksSection";
import { ListTasksHeader } from "@/features/tasks/components/ListTasksHeader";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const Tasks = () => {
  return (
    <main className="bg-blueish flex-fill position-relative" style={{ minWidth: 350 }}>
      <DndProvider backend={HTML5Backend}>
        <ListTasksHeader />
        <TasksSection />
        <TasksFooter />
      </DndProvider>
    </main>
  );
};

export { Tasks };
