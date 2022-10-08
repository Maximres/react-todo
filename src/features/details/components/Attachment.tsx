import React from "react";
import Icons from "@/components/AppIcons";

const Attachment = () => {
  return (
    <div className="m-3">
      <div className="list-group ">
        <label className="list-group-item group-item-height d-flex justify-content-between align-items-center">
          <span className="me-3">
            <Icons.File onClick={() => {
            }} />
          </span>
          <span className="form-control me-1" onFocus={() => ({})}>
            Add file
          </span>
        </label>
      </div>
    </div>
  );
};

export { Attachment };
