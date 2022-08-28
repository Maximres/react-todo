import React from "react";
import Icons from "../../../../components/AppIcons";
import { useAppDispatch, useAppSelector } from "../../../../constants/types/redux";
import { ITask } from "../../../../constants/types/tasksTypes";
import { toggleSubTaskChecked } from "../../detailsSlice";
import { handleEnterKeyPress } from "../../../../utils/helpers/enterKeyHandler";

const SubRowDetailsEditor = () => {
  const subTasks = useAppSelector((s) => s.details.subTasks);
  const dispatch = useAppDispatch();

  const handleSubTextChange = (e: any, subTask: ITask) => {
    //todo: handle sub task change
  };

  const handleSubCheck = (subTask: ITask) => {
    dispatch(
      toggleSubTaskChecked({
        subTaskId: subTask.id,
        isChecked: !subTask.isChecked,
      }),
    );
  };

  return (
    <>
      {subTasks &&
        subTasks.map((subTask) => {
          return (
            <li
              className="list-group-item d-flex justify-content-between align-items-center"
              key={subTask.id}
            >
              <input
                className="form-check-input flex-shrink-0 me-3"
                type="checkbox"
                checked={subTask.isChecked}
                onChange={() => handleSubCheck(subTask)}
              />
              <textarea
                rows={1}
                className={
                  "form-control me-1 overflow-hidden " +
                  (subTask.isChecked ? "text-decoration-line-through" : "")
                }
                value={subTask.text}
                onKeyPress={handleEnterKeyPress}
                onChange={(e) => handleSubTextChange(e, subTask)}
              />
              <div className="mx-2">
                <Icons.Options />
              </div>
            </li>
          );
        })}
    </>
  );
};

export default SubRowDetailsEditor;
