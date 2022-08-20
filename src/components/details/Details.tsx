import React from "react";
import Icons from "../common/IconsComponent";
import RowDetailsEditor from "./components/RowDetailsEditor";
import RowDetailsCalendar from "./components/RowDetailsReminder";
import RowDetailsMyDay from "./components/RowDetailsMyDay";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/redux";
import selectCurrentRow from "../../utils/selectors/selectCurrentRow";
import { toggleSidebar } from "../../app/appSlice";
import Footer from "./components/Footer";

export const Details = (): JSX.Element | null => {
  const selectedRow = useAppSelector(selectCurrentRow);
  const dispatch = useAppDispatch();
  const isSidebarVisible = useAppSelector(
    (state) => state.app.isSidebarVisible,
  );
  const closeDetails = () => {
    dispatch(toggleSidebar({ isSidebarVisible: false }));
  };

  return isSidebarVisible && selectedRow ? (
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

      <RowDetailsEditor />

      <RowDetailsMyDay />

      <RowDetailsCalendar />

      <div className="m-3">
        <div className="list-group ">
          <label className="list-group-item group-item-height d-flex justify-content-between align-items-center">
            <span className="me-3">
              <Icons.File onClick={() => {}} />
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

      <Footer />
    </aside>
  ) : null;
};
