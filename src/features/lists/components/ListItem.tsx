import React, { useRef } from "react";
import Icons from "@/components/AppIcons";
import cn from "classnames";
import { ListsInput } from "@/features/lists/components/ListsInput";
import { useDrag, useDrop } from "react-dnd";

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

  handleDrag: (
    dropId: string | null,
    type: string,
    above: boolean,
    parentId?: string,
  ) => void;
  onDragEnd: (id: string, type: string, parentId: string|undefined) => void;
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
  handleDrag,
  onDragEnd,
  dropTargetClass,
}: Props) => {
  const ref = useRef<HTMLLIElement>(null);

  const [, drag] = useDrag(() => ({
    type: "list",
    item: () => ({ id: uid, parentId, type: "list" }),
    end: (item) => {
      onDragEnd(item.id, item.type, parentId);
    },
  }));

  const [, drop] = useDrop(() => ({
    accept: "list",
    hover: (item: any, monitor) => {
      if (!ref.current) return;

      const dragId = item.id;
      const dropId = uid;
      // hovering itself
      if (dragId === dropId) {
        handleDrag(null, "list", false);
        return;
      }

      const dropRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (dropRect.bottom - dropRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const clientPositionY = clientOffset?.y ?? 0;
      const hoverClientY = clientPositionY - dropRect.top;
      const movingUpwards = hoverClientY <= hoverMiddleY;

      handleDrag(dropId, "list", movingUpwards, parentId);
    },
  }));

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={cn(
        "list-group-item list-group-item-action border-0 bg-light",
        {
          [dropTargetClass]: parentId == null,
        },
      )}
      onClick={() => onClick(uid)}
      onDoubleClick={(e) => {}}
    >
      <div
        className={cn("d-flex align-items-center", {
          " group-item-ms": parentId != null,
          [dropTargetClass]: parentId != null,
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
