import React from "react";
import Icons from "@/components/AppIcons";
import cn from "classnames";
import { ListsInput } from "@/features/lists/components/ListsInput";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  uid: string;
  index: number;
  isSubItem?: boolean;
  Icon?: JSX.Element | null;
  name: string;
  total: number;
  onClick: (uid: string) => void;
  submitEdit: (uid: string, name: string) => void;
  isFocused?: boolean;
  isDragDisabled?: boolean;
};

const ListItem = ({
  uid,
  index,
  name,
  isSubItem = false,
  isFocused = false,
  isDragDisabled = false,
  Icon = <Icons.List />,
  total = 0,
  onClick,
  submitEdit,
}: Props) => {

  const draggable = (
    <>
      <Draggable
        draggableId={uid}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="list-group-item list-group-item-action border-0 bg-light"
            onClick={() => onClick(uid)}
            onDoubleClick={(e) => {}}
          >
            <div
              className={cn("d-flex align-items-center", {
                " group-item-ms": isSubItem,
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
        )}
      </Draggable>
    </>
  );


  return draggable;
};

export default ListItem;
