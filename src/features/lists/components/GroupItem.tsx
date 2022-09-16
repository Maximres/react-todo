import React, { useRef } from "react";
import useValidId from "@/utils/hooks/useValidId";
import Icons from "@/components/AppIcons";
import { ListsInput } from "@/features/lists/components/ListsInput";
import { useDrag, useDrop } from "react-dnd";
import cn from "classnames";

type GroupProps = {
  children: JSX.Element;
  name: string;
  uid: string;
  isFocused: boolean;
  submitEdit: (uid: string, name: string) => void;

  handleDrag: (dropId: string | null, dropType: string, above: boolean) => void;
  onDragEnd: (id: string, type: string, parentId?: string) => void;
  dropTargetClass: string;
};

const GroupItem = ({
  children,
  name,
  isFocused,
  uid,
  submitEdit,
  handleDrag,
  onDragEnd,
  dropTargetClass,
}: GroupProps) => {
  const accordionId = useValidId();
  const collapseId = useValidId();
  const ariaLabel = useValidId();

  const ref = useRef<HTMLLIElement>(null);

  const [{ canDrag, isDragging }, drag] = useDrag(() => ({
    type: "group",
    item: () => ({ id: uid, type: "group" }),
    canDrag: (monitor) => {
      const dragRect = ref.current?.getBoundingClientRect();
      if (dragRect == null) return false;

      const dragBottom = dragRect.bottom;
      const cursorOffset = monitor.getClientOffset();
      const cursorY = cursorOffset?.y ?? 0;

      return dragBottom >= cursorY;
    },
    end: (item) => {
      onDragEnd(item.id, item.type);
    },
    collect: (monitor) => ({
      canDrag: monitor.canDrag(),
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: ["list", "group"],
    hover: (item: any, monitor) => {
      if (!ref.current) return;

      const dragId = item.id;
      const dropId = uid;

      const overCurrent = monitor.isOver({ shallow: true });
      if (!overCurrent)
        //hovering sub items
        return;

      // hovering itself
      if (dragId === dropId) {
        handleDrag(null, "group", false);
        return;
      }

      const dropRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (dropRect.bottom - dropRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const clientPositionY = clientOffset?.y ?? 0;
      const hoverClientY = clientPositionY - dropRect.top;
      const movingUpwards = hoverClientY <= hoverMiddleY;

      handleDrag(dropId, "group", movingUpwards);
    },
  }));

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={cn(
        "list-group-item list-group-item-action border-0 p-0",
        dropTargetClass,
      )}
    >
      <div className="accordion accordion-flush" id={accordionId}>
        <div className="accordion-item bg-light p-1">
          <div className="accordion-header" id={ariaLabel}>
            <button
              className="accordion-button bg-light"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${collapseId}`}
              aria-expanded="true"
              aria-controls={collapseId}
            >
              <div className="text-truncate me-1">
                <Icons.Group className="me-3" />
                <ListsInput
                  name={name}
                  isFocused={isFocused}
                  submitEdit={(text) => submitEdit(uid, text)}
                  className="me-3"
                />
              </div>
            </button>
          </div>
          <div
            id={collapseId}
            className="accordion-collapse collapse show"
            aria-labelledby={ariaLabel}
            data-bs-parent={`#${accordionId}`}
          >
            {children}
          </div>
        </div>
      </div>
    </li>
  );
};

export default GroupItem;
