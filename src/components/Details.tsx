import React from "react";
import { File } from "../utils/IconsComponent";
import { ActionTypes } from "../App";
import RowDetailsEditor from "./RowDetailsEditor";
import RowDetailsCalendar from "./RowDetailsReminder";
import RowDetailsMyDay from "./RowDetailsMyDay";
import useAppContext from "../hooks/useAppContext";

export const Details = (): JSX.Element | null => {
  const ctx = useAppContext();
  const selectedRow = ctx.selectedRow;

  const closeDetails = () => {
    ctx.dispatch({
      type: ActionTypes.TOGGLE_SIDEBAR,
      payload: { isSidebarVisible: false },
    });
  };

  return !ctx.state.isSidebarVisible ? null : (
    <aside
      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white overflow-auto"
      style={{ width: "380px" }}
      id="details"
    >
      <div className="d-flex align-items-center flex-shrink-0 pt-3 px-3 mx-3 link-dark justify-content-end">
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={closeDetails}
        />
      </div>

      {selectedRow && <RowDetailsEditor />}

      <RowDetailsMyDay />

      {selectedRow && <RowDetailsCalendar />}

      <div className="m-3">
        <div className="list-group ">
          <label className="list-group-item group-item-height d-flex justify-content-between align-items-center">
            <span className="me-3">
              <File onClick={() => {}} />
            </span>
            <span className="form-control me-1" onFocus={() => ({})}>
              Add file
            </span>
          </label>
        </div>
      </div>

      <div className="m-3">
        <div className="list-group ">
          <label className="list-group-item group-item-height d-flex justify-content-between align-items-center">
            <textarea
              rows={3}
              className="form-control overflow-hidden"
              placeholder="Add note"
              onKeyPress={() => ({})}
              onChange={() => ({})}
              aria-label="..."
            />
          </label>
        </div>
      </div>
    </aside>
  );
};
