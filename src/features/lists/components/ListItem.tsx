import React from "react";
import Icons from "@/components/AppIcons";
import cn from "classnames";

type Props = {
  isSubItem?: boolean;
  Icon?: JSX.Element;
  name?: string;
  total?: number;
  uid?: string;
  onClick: (uid: string) => void;
};

const ListItem = ({
  uid = "",
  isSubItem,
  name,
  Icon = <Icons.List />,
  total = 0,
  onClick,
}: Props) => {
  return (
    <li
      className="list-group-item list-group-item-action border-0 bg-light"
      onClick={() => onClick(uid)}
    >
      <div
        className={cn("d-flex align-items-center", {
          " group-item-ms": isSubItem,
        })}
      >
        {Icon}
        <span className="flex-grow-1 mx-3 text-truncate">{name}</span>
        <span className="badge rounded-pill bg-badge-light text-dark ms-auto fw-light">
          {total}
        </span>
      </div>
    </li>
  );
};

export default ListItem;
