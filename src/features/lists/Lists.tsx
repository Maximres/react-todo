import React, { useEffect } from "react";
import { ListHeader } from "./components/ListHeader";
import { ListContent } from "@/features/lists/components/ListContent";

const Lists = () => {
  useEffect(() => {
    console.log("test:rerended");
  });

  return (
    <aside
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-light"
      style={{ width: 350 }}
      id="list"
    >
      <ListHeader />
      <ListContent />
    </aside>
  );
};

export { Lists };
