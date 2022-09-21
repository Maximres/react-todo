import React from "react";
import useValidId from "@/utils/hooks/useValidId";
import Icons from "@/components/AppIcons";
import { ListsInput } from "./ListsInput";
import cn from "classnames";
import { DndElement, DropPosition } from "../ducks/constants/types";
import { useSortableGroup } from "../ducks/hooks/useSortableGroup";

type GroupProps = {
  children: JSX.Element;
  name: string;
  uid: string;
  isFocused: boolean;
  onSubmitEdit: (uid: string, name: string) => void;

  onDropHover: (
    dropId: string | null,
    dropType: DndElement,
    position: DropPosition,
  ) => void;
  onDragEnd: (id: string | null, type: DndElement, parentId?: string) => void;
  hoverClass: string;
};

const GroupItem = ({
  children,
  name,
  isFocused,
  uid,
  onSubmitEdit,
  onDropHover,
  onDragEnd,
  hoverClass,
}: GroupProps) => {
  const accordionId = useValidId();
  const collapseId = useValidId();
  const ariaLabel = useValidId();
  const [{ isDragging, item, isOver }, ref] = useSortableGroup(
    uid,
    onDragEnd,
    onDropHover,
  );

  const isDraggingCurrentItem = isDragging && uid === item.id;
  return (
    <>
      <li
        ref={ref}
        className="list-group-item list-group-item-action border-0 p-0"
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
                    name={name}
                    isFocused={isFocused}
                    submitEdit={(text) => onSubmitEdit(uid, text)}
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

    </>
  );
};

export default GroupItem;
