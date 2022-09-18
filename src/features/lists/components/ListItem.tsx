import React, { useRef } from "react";
import Icons from "@/components/AppIcons";
import cn from "classnames";
import { ListsInput } from "@/features/lists/components/ListsInput";
import { useDrag, useDrop } from "react-dnd";
import { DndElement, DropPosition } from "../ducks/constants/types";

type Props = {
  uid: string;
  parentId?: string;
  Icon?: JSX.Element | null;
  name: string;
  total: number;
  onClick: (uid: string) => void;
  submitEdit: (uid: string, name: string) => void;
  isFocused?: boolean;
  isDragDisabled?: boolean;

  handleHoverDrop: (
    dropId: string | null,
    type: DndElement,
    dropPosition: DropPosition,
    parentId?: string,
  ) => void;
  onDragEnd: (
    id: string | null,
    type: DndElement,
    parentId: string | undefined,
  ) => void;
  dropTargetClass: string;
};

const ListItem = ({
  uid,
  name,
  parentId,
  isFocused = false,
  isDragDisabled = false,
  Icon = <Icons.List />,
  total = 0,
  onClick,
  submitEdit,
  handleHoverDrop,
  onDragEnd,
  dropTargetClass,
}: Props) => {
  const ref = useRef<HTMLLIElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "list",
    item: () => ({ id: uid, parentId, type: "list" as DndElement }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      const dragId = didDrop ? item.id : null;
      onDragEnd(dragId, item.type, parentId);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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
            handleHoverDrop(null, "list", "inside");
            return;
          }

          handleHoverDrop(dropId, "list", "inside");
          return;
        }

        const dropRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY = (dropRect.bottom - dropRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const clientPositionY = clientOffset?.y ?? 0;
        const hoverClientY = clientPositionY - dropRect.top;
        const movingUpwards = hoverClientY <= hoverMiddleY ? "above" : "below";

        handleHoverDrop(dropId, "list", movingUpwards, parentId);
      },
      collect: (monitor) => ({
        isOverCurrent: monitor.isOver({ shallow: true }),
        isOver: monitor.isOver(),
      }),
    }),
    [parentId],
  );

  drag(drop(ref));

  const isSubItem = parentId != null;
  const isDraggingOverCurrentItem = isDragging && isOverCurrent;
  return (
    <li
      ref={ref}
      className={cn(
        "list-group-item list-group-item-action border-0 bg-light",
        {
          [dropTargetClass]: !isSubItem && isOverCurrent,
        },
      )}
      onClick={() => onClick(uid)}
      onDoubleClick={(e) => {}}
    >
      <div
        className={cn("d-flex align-items-center", {
          " group-item-ms": isSubItem,
          [dropTargetClass]: isSubItem && isOver
        })}
      >
        {Icon}
        <ListsInput
          name={name}
          isFocused={isFocused}
          submitEdit={(text) => submitEdit(uid, text)}
          className="mx-3"
        />
        <span className="badge rounded-pill bg-badge-light text-dark ms-auto fw-light">
          {total}
        </span>
      </div>
    </li>
  );
};

export default ListItem;
