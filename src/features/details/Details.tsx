import React from "react";
import Icons from "@/components/AppIcons";
import RowDetailsEditor from "./components/RowDetailsEditor";
import RowDetailsReminder from "./components/RowDetailsReminder";
import RowDetailsMyDay from "./components/RowDetailsMyDay";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { closeSidebar } from "@/features/tasks";
import Footer from "./components/Footer";
import { RowNoteTextArea } from "@/features/details/components/rows/RowNoteTextArea";

export const Details = (): JSX.Element | null => {
  const isVisible = useAppSelector((state) => state.details.isVisible);
  const dispatch = useAppDispatch();

  const closeDetails = () => {
    dispatch(closeSidebar());
  };

  if (!isVisible) return null;

  return (
    <aside
      className="d-flex flex-column align-items-stretch flex-shrink-0 overflow-auto bg-light"
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

      <RowDetailsReminder />

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

      <RowNoteTextArea/>

      <Footer />
    </aside>
  );
};
