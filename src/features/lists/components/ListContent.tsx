import React from "react";
import { ListSection } from "@/features/lists/components/ListSection";
import { ListFooter } from "@/features/lists/components/ListFooter";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const ListContent = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ListSection />
        <ListFooter />
      </DndProvider>
    </>
  );
};

export { ListContent };
