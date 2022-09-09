﻿import React from "react";
import useValidId from "@/utils/hooks/useValidId";
import Icons from "@/components/AppIcons";

type GroupProps = {
  children: JSX.Element;
  name: string;
};

const GroupItem = ({ children, name }: GroupProps) => {
  const accordionId = useValidId();
  const collapseId = useValidId();
  const ariaLabel = useValidId();
  return (
    <li className="list-group-item list-group-item-action border-0 p-0">
      <div className="accordion accordion-flush" id={accordionId}>
        <div className="accordion-item bg-light p-1">
          <div className="accordion-header" id={ariaLabel}>
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
                <input
                  value={name}
                  type="text"
                  className="border-0 bg-transparent flex-grow-1 me-3 text-truncate"
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
