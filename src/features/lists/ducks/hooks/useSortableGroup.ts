import {
  DndElement,
  DropPosition,
} from "@/features/lists/ducks/constants/types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const useSortableGroup = (
  uid: string,
  onDragEnd: (id: string | null, type: DndElement, parentId?: string) => void,
  onDropHover: (
    dropId: string | null,
    dropType: DndElement,
    position: DropPosition,
  ) => void,
) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging, item }, drag] = useDrag(() => ({
    type: "group",
    item: () => ({ id: uid, type: "group" as DndElement }),
    canDrag: (monitor) => {
      const dragRect = ref.current?.getBoundingClientRect();
      if (dragRect == null) return false;

      const dragBottom = dragRect.bottom;
      const cursorOffset = monitor.getClientOffset();
      const cursorY = cursorOffset?.y ?? 0;

      return dragBottom >= cursorY;
    },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      const dropId = didDrop ? item.id : null;
      onDragEnd(dropId, item.type);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["list", "group"],
    hover: (item: { id: string; type: DndElement }, monitor) => {
      if (!ref.current) return;

      const dragId = item.id;
      const dropId = uid;

      const overCurrent = monitor.isOver({ shallow: true });
      if (!overCurrent)
        //can't drop group to self sub items
        return;

      // hovering itself container
      if (dragId === dropId) {
        onDropHover(dropId, "group", "inside");
        return;
      }

      const dropRect = ref.current?.getBoundingClientRect();
      const hoverMiddle = dropRect.bottom - dropRect.top;
      const dropY = Math.floor(dropRect.y);
      const thirdHeight = Math.floor(hoverMiddle / 3);
      const clientOffset = monitor.getClientOffset();
      const clientPositionY = clientOffset?.y ?? 0;

      const topDropYBaseline = dropY + thirdHeight;
      const centerDropYBaseline = dropY + thirdHeight * 2;
      const topPartHovered =
        clientPositionY >= dropY && clientPositionY <= topDropYBaseline;
      if (topPartHovered) {
        onDropHover(dropId, "group", "above");
        return;
      }

      const centerPartHovered =
        clientPositionY > topDropYBaseline &&
        clientPositionY <= centerDropYBaseline;
      const draggingList = item.type === "list";
      if (centerPartHovered && draggingList) {
        onDropHover(dropId, "group", "inside");
        return;
      }

      //else: bellow part hovered
      onDropHover(dropId, "group", "below");
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  drag(drop(ref));

  const foo = { isDragging, item, isOver };
  return [foo, ref] as [typeof foo, typeof ref];
};

export { useSortableGroup };