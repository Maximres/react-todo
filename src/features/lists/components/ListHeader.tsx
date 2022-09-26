import Icons from "@/components/AppIcons";
import React from "react";

const ListHeader = () => {
  return (
    <header>
      <div className="navbar py-3 pb-0">
        <div className="d-flex align-items-center w-100 px-3">
          <span className="navbar-brand ">
            <span className="account-icon">
              <Icons.User className="text-white" />
            </span>
          </span>
          <div className="navbar-nav flex-grow-1 text-truncate">
            <span title="Maxim" className="fa-x fw-bold text-truncate">
              Maxim
            </span>
            <span title="test@gmail.com" className="fa-sm lh-base text-muted text-truncate">
              test@gmail.com
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center w-100 px-3 my-2">
          <input
            className="form-control form-control-sm "
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <Icons.Search className="form-control-after-search" />
        </div>
        <hr className="w-100 m-0 mt-2" />
      </div>
    </header>
  );
};

export { ListHeader };