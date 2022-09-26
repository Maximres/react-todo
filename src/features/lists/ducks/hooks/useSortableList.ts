import { DndElement, DropPosition } from "@/features/lists/ducks/constants/types";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const useSortableList = (
  uid: string,
  parentId: string | undefined,
  onDragEnd: (id: string | null, type: DndElement, parentId: string | undefined) => void,
  isDragDisabled: boolean | undefined,
  onDropHover: (
    dropId: string | null,
    type: DndElement,
    dropPosition: DropPosition,
    parentId?: string,
  ) => void,
) => {
  const ref = useRef<HTMLLIElement>(null);

  const [_, drag] = useDrag(() => ({
    type: "list",
    item: () => ({ id: uid, parentId, type: "list" as DndElement }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      const dragId = didDrop ? item.id : null;
      onDragEnd(dragId, item.type, parentId);
    },
    canDrag: () => !isDragDisabled,
  }));

  const [{ isOverCurrent, isOver }, drop] = useDrop(
    () => ({
      accept: ["list", "group"] as DndElement[],
      canDrop: (item: { type: DndElement }) => {
        const dropGroupToSubItems = item.type === "group" && !!parentId;
        if (dropGroupToSubItems) return false;

        return !isDragDisabled;
      },
      hover: (item: any, monitor) => {
        if (!ref.current) return;
        if (!monitor.canDrop()) return;

        const dragId = item.id;
        const dropId = uid;
        // hovering itself
        if (dragId === dropId) {
          const isSubItem = parentId != null;
          if (isSubItem) {
            onDropHover(null, "list", "inside");
            return;
          }

          onDropHover(dropId, "list", "inside");
          return;
        }

        const dropRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (dropRect.bottom - dropRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const clientPositionY = clientOffset?.y ?? 0;
        const hoverClientY = clientPositionY - dropRect.top;
        const movingUpwards = hoverClientY <= hoverMiddleY ? "above" : "below";

        onDropHover(dropId, "list", movingUpwards, parentId);
      },
      collect: (monitor) => ({
        isOverCurrent: monitor.isOver({ shallow: true }),
        isOver: monitor.isOver(),
      }),
    }),
    [parentId],
  );

  drag(drop(ref));

  const foo = { isOverCurrent, isOver };
  return [foo, ref] as [typeof foo, typeof ref];
};

export { useSortableList };
