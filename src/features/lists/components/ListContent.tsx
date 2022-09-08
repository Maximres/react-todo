import React, { useState } from "react";
import { ListSection } from "@/features/lists/components/ListSection";
import { ListFooter } from "@/features/lists/components/ListFooter";
import ListGroup from "@/features/lists/components/ListGroup";

const ListContent = () => {
  const [lastCreatedId, setLastCreatedId] = useState("");

  const setLastCreatedIdValue = (id: string) => {
    setLastCreatedId(id);
  };
  return (
    <>
      <ListSection
        render={(render) => (
          <>
            <ListGroup
              items={render.defaultItems}
              onItemClick={render.itemClick}
              onEditSubmit={render.editSubmit}
            />
            <hr className="w-100 m-0" />
            <ListGroup
              items={render.items}
              onItemClick={render.itemClick}
              onEditSubmit={render.editSubmit}
              lastCreatedId={lastCreatedId}
            />
          </>
        )}
      />
      <ListFooter setLastCreatedId={setLastCreatedIdValue} />
    </>
  );
};

export { ListContent };
