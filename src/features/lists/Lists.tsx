import React, { useEffect } from "react";
import { ListHeader } from "./components/ListHeader";
import { ListContent } from "@/features/lists/components/ListContent";

const Lists = () => {
  return (
    <aside
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-light w-100 overflow-auto z-index-1"
      id="list"
    >
      <ListHeader />
      <ListContent />
    </aside>
  );
};

export { Lists };
