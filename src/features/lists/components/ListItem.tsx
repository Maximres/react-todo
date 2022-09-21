import React, { useRef } from "react";
import Icons from "@/components/AppIcons";
import cn from "classnames";
import { ListsInput } from "./ListsInput";
import { DndElement, DropPosition } from "../ducks/constants/types";
import { useSortableList } from "../ducks/hooks/useSortableList";
import useValidId from "@/utils/hooks/useValidId";
import "@szhsin/react-menu/dist/index.css";
import { ControlledMenu, MenuItem, useMenuState } from "@szhsin/react-menu";

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
  const dropdownMenuId = useValidId();
  const [menuProps, toggleMenu] = useMenuState();
  const dropdownRef = useRef(null);

  const [{ isOverCurrent, isOver }, ref] = useSortableList(
    uid,
    parentId,
    onDragEnd,
    isDragDisabled,
    onDropHover,
  );

  const isSubItem = parentId != null;
  return (
    <>
      <li
        ref={ref}
        className={cn(
          "list-group-item list-group-item-action",
          "border-0 bg-light",

          {
            [hoverClass]: !isSubItem && isOverCurrent,
          },
        )}
        onClick={() => onClick(uid)}
        onContextMenu={(e) => {
          e.preventDefault();
          toggleMenu(true);
        }}
      >
        <div
          ref={dropdownRef}
          className={cn("d-flex align-items-center", {
            " group-item-ms": isSubItem,
            [hoverClass]: isSubItem && isOver,
          })}
          aria-expanded="false"
          id={dropdownMenuId}
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
        <ControlledMenu
          {...menuProps}
          anchorRef={dropdownRef}
          onClose={() => toggleMenu(false)}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <MenuItem>Cut</MenuItem>
          <MenuItem>Copy</MenuItem>
          <MenuItem>Paste</MenuItem>
        </ControlledMenu>
      </li>
    </>
  );
};

export default ListItem;
