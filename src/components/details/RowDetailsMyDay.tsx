import React from "react";
import { MyDay } from "../../utils/IconsComponent";
import { useAppDispatch, useAppSelector } from "../../data/hooks";
import selectCurrentRow from "../../data/selectors";
import { IRow } from "../../types/appTypes";
import { updateTask } from "../../data/appSlice";

const RowDetailsMyDay = () => {
  const selectedTask = useAppSelector(selectCurrentRow) as IRow;
  const dispatch = useAppDispatch();
  const myDayTextColor = selectedTask.isMyDay ? "text-primary" + " " : "";
  const addToMyDay = () => {
    dispatch(updateTask({ ...selectedTask, isMyDay: !selectedTask.isMyDay }));
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
