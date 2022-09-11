import React from "react";
import Icons from "@/components/AppIcons";
import cn from "classnames";
import { ListsInput } from "@/features/lists/components/ListsInput";

type Props = {
  isSubItem?: boolean;
  Icon?: JSX.Element | null;
  name: string;
  total: number;
  uid: string;
  onClick: (uid: string) => void;
  submitEdit: (uid: string, name: string) => void;
  isFocused?: boolean;
};

const ListItem = ({
  uid,
  name,
  isSubItem = false,
  isFocused = false,
  Icon = <Icons.List />,
  total = 0,
  onClick,
  submitEdit,
}: Props) => {
  return (
    <li
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
        />
        <span className="badge rounded-pill bg-badge-light text-dark ms-auto fw-light">
          {total}
        </span>
      </div>
    </li>
  );
};

export default ListItem;
