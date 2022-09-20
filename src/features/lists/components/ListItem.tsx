import React from "react";
import Icons from "@/components/AppIcons";
import cn from "classnames";
import { ListsInput } from "./ListsInput";
import { DndElement, DropPosition } from "../ducks/constants/types";
import { useSortableList } from "../ducks/hooks/useSortableList";

type Props = {
  uid: string;
  parentId?: string;
  Icon?: JSX.Element | null;
  name: string;
  total: number;
  onClick: (uid: string) => void;
  onSubmitEdit: (uid: string, name: string) => void;
  isFocused?: boolean;
  isDragDisabled?: boolean;

  onDropHover: (
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
  hoverClass: string;
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
  onSubmitEdit,
  onDropHover,
  onDragEnd,
  hoverClass,
}: Props) => {
  const [{ isOverCurrent, isOver }, ref] = useSortableList(
    uid,
    parentId,
    onDragEnd,
    isDragDisabled,
    onDropHover,
  );

  const isSubItem = parentId != null;
  return (
    <li
      ref={ref}
      className={cn(
        "list-group-item list-group-item-action border-0 bg-light",
        {
          [hoverClass]: !isSubItem && isOverCurrent,
        },
      )}
      onClick={() => onClick(uid)}
      onDoubleClick={(e) => {}}
    >
      <div
        className={cn("d-flex align-items-center", {
          " group-item-ms": isSubItem,
          [hoverClass]: isSubItem && isOver,
        })}
      >
        {Icon}
        <ListsInput
          name={name}
          isFocused={isFocused}
          submitEdit={(text) => onSubmitEdit(uid, text)}
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
