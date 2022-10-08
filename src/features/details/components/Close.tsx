import React from "react";
import { useAppDispatch } from "@/constants/types/redux";
import { closeSidebar } from "@/features/tasks";

const Close = () => {
  const dispatch = useAppDispatch();

  const closeDetails = () => {
    dispatch(closeSidebar());
  };

  return (
    <div className="d-flex align-items-center flex-shrink-0 pt-3 px-3 mx-3 link-dark justify-content-end">
      <button type="button" className="btn-close" aria-label="Close" onClick={closeDetails} />
    </div>
  );
};

export { Close };
