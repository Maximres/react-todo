import React from "react";
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
        <div className="accordion-item bg-light">
          <div className="accordion-header" id={ariaLabel}>
            <button
              className="accordion-button bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#${collapseId}`}
              aria-expanded="true"
              aria-controls={collapseId}
            >
              <div className="text-truncate me-1">
                <Icons.Group className="me-3" />
                <span>{name}</span>
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
