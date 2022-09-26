import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const useSortableTasks = (
  id: string,
  onDragEnd: (id: string) => void,
  handleDrag: (dropId: string | null, above: boolean) => void,
) => {
  const ref = useRef<HTMLTableRowElement>(null);

  const [, drag] = useDrag(() => ({
    type: "task",
    item: () => ({ id: id, type: "task" }),
    end: (item) => {
      onDragEnd(item.id);
    },
  }));

  const [, drop] = useDrop(() => ({
    accept: "task",
    hover: (item: any, monitor) => {
      if (!ref.current) return;

      const dragId = item.id;
      const dropId = id;

      // hovering itself
      if (dragId === dropId) {
        handleDrag(null, false);
        return;
      }

      const dropRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (dropRect.bottom - dropRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const clientPositionY = clientOffset?.y ?? 0;
      const hoverClientY = clientPositionY - dropRect.top;
      const movingUpwards = hoverClientY <= hoverMiddleY;

      handleDrag(dropId, movingUpwards);
    },
  }));

  drag(drop(ref));
  return [ref];
};

export { useSortableTasks };
