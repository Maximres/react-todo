import React from "react";
import Icons from "@/components/AppIcons";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import selectCurrentRow from "@/utils/selectors/selectCurrentRow";
import { IRow } from "@/constants/types/tasksTypes";
import { updateTask } from "@features/main";
import classNames from "classnames";

const RowDetailsMyDay = () => {
  const selectedTask = useAppSelector(selectCurrentRow) as IRow;
  const dispatch = useAppDispatch();
  const addToMyDay = () => {
    dispatch(updateTask({ ...selectedTask, isMyDay: !selectedTask.isMyDay }));
  };

  return (
    <div className="m-3">
      <div className="list-group">
        <label
          className={classNames(
            "list-group-item group-item-height d-flex justify-content-between align-items-center pointer",
            { "text-primary": selectedTask.isMyDay },
          )}
          onClick={addToMyDay}
        >
          <span className="me-3">
            <Icons.MyDay />
          </span>
          <span
            className={classNames(
              { "text-primary": selectedTask.isMyDay },
              "form-control me-1",
            )}
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
