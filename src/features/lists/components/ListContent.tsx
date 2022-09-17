import React, { useState } from "react";
import {
  ListBarSection,
  RenderProps,
} from "@/features/lists/components/ListBarSection";
import { ListFooter } from "@/features/lists/components/ListFooter";
import ListGroup from "@/features/lists/components/ListGroup";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const ListContent = () => {
  const [lastListItemId, setLastListItemId] = useState("");

  const setLastCreatedIdValue = (id: string) => {
    setLastListItemId(id);
  };

  const renderChild = (render: RenderProps) => (
    <>
      <ListGroup
        items={render.defaultItems}
        onItemClick={render.itemClick}
        onListEditSubmit={render.editListSubmit}
        onGroupEditSubmit={render.editGroupSubmit}
        dndDisabled={true}
      />
      <hr className="w-100 m-0" />
      <ListGroup
        items={render.items}
        onItemClick={render.itemClick}
        onListEditSubmit={render.editListSubmit}
        onGroupEditSubmit={render.editGroupSubmit}
        lastCreatedId={lastListItemId}
      />
    </>
  );

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <ListBarSection render={renderChild} />
        <ListFooter setLastCreatedId={setLastCreatedIdValue} />
      </DndProvider>
    </>
  );
};

export { ListContent };
