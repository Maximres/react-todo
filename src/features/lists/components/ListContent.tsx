import React, { useState } from "react";
import { ListSection, RenderProps } from "@/features/lists/components/ListSection";
import { ListFooter } from "@/features/lists/components/ListFooter";
import ListGroup from "@/features/lists/components/ListGroup";

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
      <ListSection render={renderChild} />
      <ListFooter setLastCreatedId={setLastCreatedIdValue} />
    </>
  );
};

export { ListContent };
