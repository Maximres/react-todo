import React from "react";
import { MyDay } from "../utils/IconsComponent";
import useAppContext from "../hooks/useAppContext";
import { ActionTypes } from "../App";

const RowDetailsMyDay = () => {
  const ctx = useAppContext();
  const selectedTask = ctx.selectedRow;
  const myDayTextColor = selectedTask.isMyDay ? "text-primary" + " " : "";
  const addToMyDay = () => {
    selectedTask.isMyDay = !selectedTask.isMyDay;
    ctx.dispatch({ type: ActionTypes.UPDATE_TASK, payload: selectedTask });
  };

  return (
    <div className="m-3">
      <div className="list-group">
        <label
          className={
            myDayTextColor +
            "list-group-item group-item-height d-flex justify-content-between align-items-center pointer"
          }
          onClick={addToMyDay}
        >
          <span className="me-3">
            <MyDay />
          </span>
          <span
            className={myDayTextColor + "form-control me-1"}
            onFocus={() => ({})}
          >
            Add to My Day
          </span>
        </label>
      </div>
    </div>
  );
};

export default RowDetailsMyDay;
