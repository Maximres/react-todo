import React from "react";
import Icons from "../../../../components/AppIcons";
import { useAppDispatch, useAppSelector } from "../../../../configs/redux";
import selectCurrentRow from "../../../../utils/selectors/selectCurrentRow";
import { IRow, ITask } from "../../../../constants/types/appTypes";
import { toggleChecked, toggleFavorite, updateTask } from "../../../tasks/tasksSlice";
import { handleEnterKeyPress } from "../../../../utils/helpers/enterKeyHandler";

const RowDetails = () => {
  const selectedRow = useAppSelector(selectCurrentRow) as IRow;
  const dispatch = useAppDispatch();

  const handleCheck = (task: IRow) => {
    dispatch(toggleChecked({ task: task, isChecked: !task.isChecked }));
  };

  const handleTextChange = (e: any, task: ITask) => {
    dispatch(updateTask({ ...(task as IRow), text: e.target.value }));
  };

  const toggleFavoriteTask = () => {
    const row = selectedRow;
    dispatch(toggleFavorite({ task: row, isFavorite: !row.isFavorite }));
  };
  return (
    <li className="list-group-item group-item-height d-flex justify-content-between align-items-center flex-fill">
      <input
        className="form-check-input me-3 p-2 flex-shrink-0"
        type="checkbox"
        checked={selectedRow.isChecked}
        onChange={() => handleCheck(selectedRow)}
      />
      <textarea
        rows={1}
        className="form-control me-1 overflow-hidden fw-bolder fs-4"
        value={selectedRow.text}
        onKeyPress={handleEnterKeyPress}
        onChange={(e) => handleTextChange(e, selectedRow)}
      />

      <Icons.Favorite
        onClick={() => toggleFavoriteTask()}
        isFavorite={selectedRow.isFavorite}
      />
    </li>
  );
};

export default RowDetails;
