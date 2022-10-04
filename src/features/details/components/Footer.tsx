﻿import React from "react";
import Icons from "@/components/AppIcons";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { ITask } from "@/constants/types/tasksTypes";
import { deleteTask } from "@/features/tasks";
import { differenceInYears, format } from "date-fns";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";

const Footer = () => {
  const selectedRow = useAppSelector(currentTaskSelector) as ITask;
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
      <Icons.Trash className="p-3 fs-5" onClick={clickHandler} />
    </div>
  );
};

export default Footer;
