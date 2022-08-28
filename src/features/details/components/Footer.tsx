import React from "react";
import Icons from "../../../components/AppIcons";
import { useAppDispatch, useAppSelector } from "../../../constants/types/redux";
import { IRow } from "../../../constants/types/tasksTypes";
import { deleteTask } from "../../main/mainSlice";
import { differenceInYears, format } from "date-fns";
import selectCurrentRow from "../../../utils/selectors/selectCurrentRow";

const Footer = () => {
  const selectedRow = useAppSelector(selectCurrentRow) as IRow;
  const dispatch = useAppDispatch();
  const clickHandler = () => {
    dispatch(deleteTask(selectedRow.id));
  };
  const weekMonthDayFormat = "iii, LLL d";
  const weekMonthDayFormatAndYear = "iii, LLL d, Y";
  const yearsDiff = differenceInYears(new Date(), selectedRow.createdDate);

  return (
    <div className="border-top mt-auto d-flex justify-content-between align-items-center">
      <div className="text-center flex-grow-1">
        <span>
          Created on{" "}
          {format(
            selectedRow.createdDate,
            yearsDiff > 0 ? weekMonthDayFormatAndYear : weekMonthDayFormat,
          )}
        </span>
      </div>
      <Icons.Trash className="p-4 fs-5" onClick={clickHandler} />
    </div>
  );
};

export default Footer;