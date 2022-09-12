import React, { useState } from "react";
import {
  ListSection,
  RenderProps,
} from "@/features/lists/components/ListSection";
import { ListFooter } from "@/features/lists/components/ListFooter";
import ListGroup from "@/features/lists/components/ListGroup";
import { Droppable } from "react-beautiful-dnd";

const ListContent = () => {
  const [lastListItemId, setLastListItemId] = useState("");

  const setLastCreatedIdValue = (id: string) => {
    setLastListItemId(id);
  };

  const renderChild = (render: RenderProps) => (
    <>
      <Droppable droppableId="list_default">
        {(provided) => (
          <>
            <ListGroup
              items={render.defaultItems}
              onItemClick={render.itemClick}
              onListEditSubmit={render.editListSubmit}
              onGroupEditSubmit={render.editGroupSubmit}
              dnd={provided}
            />
          </>
        )}
      </Droppable>

      <hr className="w-100 m-0" />
      <Droppable droppableId="list_user">
        {(provided) => (
          <>
            <ListGroup
              items={render.items}
              onItemClick={render.itemClick}
              onListEditSubmit={render.editListSubmit}
              onGroupEditSubmit={render.editGroupSubmit}
              lastCreatedId={lastListItemId}
              dnd={provided}
            />
          </>
        )}
      </Droppable>
    </>
  );

  return (
    <>
      <ListSection render={renderChild} />
      <ListFooter setLastCreatedId={setLastCreatedIdValue} />
    </>
  );
};

export { ListContent };
