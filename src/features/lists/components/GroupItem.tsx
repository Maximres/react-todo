import React, { useRef } from "react";
import useValidId from "@/utils/hooks/useValidId";
import Icons from "@/components/AppIcons";
import { ListsInput } from "./ListsInput";
import { useDrag, useDrop } from "react-dnd";
import cn from "classnames";
import { DndElement, DropPosition } from "../ducks/constants/types";

type GroupProps = {
  children: JSX.Element;
  name: string;
  uid: string;
  isFocused: boolean;
  submitEdit: (uid: string, name: string) => void;

  handleHoverDrop: (
    dropId: string | null,
    dropType: DndElement,
    position: DropPosition,
  ) => void;
  onDragEnd: (id: string | null, type: DndElement, parentId?: string) => void;
  dropTargetClass: string;
};

const GroupItem = ({
  children,
  name,
  isFocused,
  uid,
  submitEdit,
  handleHoverDrop,
  onDragEnd,
  dropTargetClass,
}: GroupProps) => {
  const accordionId = useValidId();
  const collapseId = useValidId();
  const ariaLabel = useValidId();

  const ref = useRef<HTMLLIElement>(null);

  const [{ canDrag, isDragging, item }, drag] = useDrag(() => ({
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
      canDrag: monitor.canDrag(),
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
        handleHoverDrop(dropId, "group", "inside");
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
        handleHoverDrop(dropId, "group", "above");
        return;
      }

      const centerPartHovered =
        clientPositionY > topDropYBaseline &&
        clientPositionY <= centerDropYBaseline;
      const draggingList = item.type === "list";
      if (centerPartHovered && draggingList) {
        handleHoverDrop(dropId, "group", "inside");
        return;
      }

      //else: bellow part hovered
      handleHoverDrop(dropId, "group", "below");
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  drag(drop(ref));
  const isDraggingCurrentItem = isDragging && uid === item.id;

  return (
    <li
      ref={ref}
      className="list-group-item list-group-item-action border-0 p-0"
    >
      <div className="accordion accordion-flush" id={accordionId}>
        <div className="accordion-item bg-light p-1">
          <div
            className={cn("accordion-header", {
              [dropTargetClass]: !isDraggingCurrentItem && isOver,
            })}
            id={ariaLabel}
          >
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
