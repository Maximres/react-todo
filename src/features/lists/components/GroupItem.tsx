import React from "react";
import useValidId from "@/utils/hooks/useValidId";
import Icons from "@/components/AppIcons";
import { ListsInput } from "./ListsInput";
import cn from "classnames";
import { DndElement, DropPosition } from "../ducks/constants/types";
import { useSortableGroup } from "../ducks/hooks/useSortableGroup";
import { GroupContextMenu } from "@/features/lists/components/GroupContextMenu";
import { ClickEvent, useMenuState } from "@szhsin/react-menu";
import { GroupItemOperations } from "@/features/lists/ducks/constants/contextMenuOperations";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { isEditingSelector } from "@/features/lists/ducks/selectors/isEditingSelector";
import {
  createList,
  deleteGroup,
  endEditItem,
  startEditItem,
  unGroup,
} from "@features/lists";

type GroupProps = {
  children: JSX.Element;
  name: string;
  uid: string;
  onSubmitEdit: (uid: string, name: string) => void;

  onDropHover: (
    dropId: string | null,
    dropType: DndElement,
    position: DropPosition,
  ) => void;
  onDragEnd: (id: string | null, type: DndElement, parentId?: string) => void;
  hoverClass: string;
  hasSubItems: boolean;
};

const isGroupItem = (value: unknown): value is GroupItemOperations => {
  return (
    value != null &&
    Object.values(GroupItemOperations).includes(value as GroupItemOperations)
  );
};

const GroupItem = ({
  children,
  name,
  uid,
  onSubmitEdit,
  onDropHover,
  onDragEnd,
  hoverClass,
  hasSubItems,
}: GroupProps) => {
  const dispatch = useAppDispatch();
  const accordionId = useValidId();
  const collapseId = useValidId();
  const ariaLabel = useValidId();
  const [menuProps, toggleMenu] = useMenuState();
  const [{ isDragging, item, isOver }, ref] = useSortableGroup(
    uid,
    onDragEnd,
    onDropHover,
  );
  const isInEditMode = useAppSelector((x) => isEditingSelector(x, uid));

  const onItemClick = (e: ClickEvent) => {
    const value = e.value as GroupItemOperations;
    if (!isGroupItem(value)) return;

    switch (value) {
      case GroupItemOperations.Rename: {
        dispatch(startEditItem(uid));
        break;
      }
      case GroupItemOperations.Add: {
        dispatch(createList(uid));
        break;
      }
      case GroupItemOperations.Ungroup: {
        dispatch(unGroup(uid));
        break;
      }
      case GroupItemOperations.Delete: {
        dispatch(deleteGroup(uid));
        break;
      }
    }
  };

  const isDraggingCurrentItem = isDragging && uid === item.id;

  const submitEdit = (text: string) => {
    onSubmitEdit(uid, text);
  };

  const exitEditMode = () => {
    dispatch(endEditItem());
  };

  return (
    <>
      <li
        ref={ref}
        className="list-group-item list-group-item-action border-0 p-0"
        onContextMenu={(e) => {
          e.preventDefault();
          toggleMenu(true);
        }}
      >
        <div className="accordion accordion-flush" id={accordionId}>
          <div className="accordion-item bg-light p-1">
            <div
              className={cn("accordion-header", {
                [hoverClass]: !isDraggingCurrentItem && isOver,
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
                    key={uid + isInEditMode}
                    name={name}
                    isEditMode={isInEditMode}
                    submitEdit={submitEdit}
                    onBlur={exitEditMode}
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
        <GroupContextMenu
          menuProps={menuProps}
          toggleMenu={toggleMenu}
          ref={ref}
          onItemClick={onItemClick}
          isDeletable={!hasSubItems}
        />
      </li>
    </>
  );
};

export default GroupItem;
