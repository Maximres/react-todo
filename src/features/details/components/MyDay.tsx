import React from "react";
import Icons from "@/components/AppIcons";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";
import { updateTask } from "@/features/tasks";
import classNames from "classnames";

const MyDay = () => {
  const selectedTask = useAppSelector(currentTaskSelector);
  const dispatch = useAppDispatch();
  const addToMyDay = () => {
    dispatch(
      updateTask({
        id: selectedTask!.id,
        task: {
          isMyDay: !selectedTask!.isMyDay,
        },
      }),
    );
  };

  if (selectedTask == null) return null;

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
            className={classNames({ "text-primary": selectedTask.isMyDay }, "form-control me-1")}
            onFocus={() => ({})}
          >
            Add to My Day
          </span>
        </label>
      </div>
    </div>
  );
};

export default MyDay;
