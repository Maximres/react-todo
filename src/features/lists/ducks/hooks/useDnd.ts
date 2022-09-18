import { useCallback, useState } from "react";
import {
  DndElement,
  DragType,
  DropPosition,
  IGroupedList,
} from "../constants/types";
import { IList } from "@/constants/types/listsTypes";
import { getDragResultItem } from "../helpers/dndHelpers";

const useDnd = () => {
  const [dragEndItem, setDragEndItem] = useState<DragType | null>(null);
  const [dropPosition, setDropPosition] = useState<DropPosition>("inside");
  const [dropItemId, setDropItemId] = useState<string | null>(null);
  const [dropType, setDropType] = useState<DndElement>("list");
  const [dropParentId, setDropParentId] = useState<string | undefined>();

  const onHover = useCallback(
    (
      currentDropId: string | null,
      type: DndElement,
      position: DropPosition,
      parentId?: string,
    ) => {
      const isReset = currentDropId == null && currentDropId !== dropItemId;
      if (isReset) setDropItemId(null);

      const isHasNotChanged =
        currentDropId === dropItemId && dropPosition === position;
      if (isHasNotChanged) return;

      setDropItemId(currentDropId);
      setDropType(type);
      setDropParentId(parentId);
      setDropPosition(position);
    },
    [dropItemId, dropPosition],
  );

  const getHoveringStyle = useCallback(
    (id: string) => {
      if (dropItemId == null || dropItemId !== id) return "";

      switch (dropPosition) {
        case "inside":
          return "drag-around";
        case "above":
          return "drag-top";
        case "below":
          return "drag-bottom";
      }

      return "";
    },
    [dropItemId, dropPosition],
  );

  const reset = useCallback(() => {
    setDropItemId(null);
    setDropParentId(undefined);
  }, []);

  const onDragEnd = useCallback(
    (id: string | null, type: DndElement, parentId: string | undefined) => {
      if (id == null) {
        reset();
        return;
      }
      setDragEndItem({ id, type, parentId });
    },
    [reset],
  );

  const getDragResult = useCallback(
    (items: (IList | IGroupedList)[]) => {
      const item = getDragResultItem(
        dragEndItem,
        dropItemId,
        dropParentId,
        items,
        dropType,
        dropPosition,
      );

      return item;
    },
    [dragEndItem, dropItemId, dropParentId, dropPosition, dropType],
  );

  return {
    reset,
    onDragEnd,
    onHover,
    dragEndItem,
    getHoveringStyle,
    getDragResult,
  };
};

export { useDnd };