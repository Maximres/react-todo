import React from "react";
import Icons from "@/components/AppIcons";
import { useAppDispatch, useAppSelector } from "@/constants/types/redux";
import { ITask } from "@/constants/types/tasksTypes";
import { deleteTask } from "@/features/tasks";
import { differenceInYears, format } from "date-fns";
import { currentTaskSelector } from "@/utils/selectors/currentTaskSelector";
import { Box, Divider, IconButton, Stack, Typography } from "@mui/material";

const Footer = () => {
  const selectedRow = useAppSelector(currentTaskSelector) as ITask;
  const dispatch = useAppDispatch();
  const clickHandler = () => {
    dispatch(deleteTask(selectedRow.id));
  };
  const weekMonthDayFormat = "iii, LLL d";
  const weekMonthDayFormatAndYear = "iii, LLL d, Y";
  const yearsDiff = differenceInYears(new Date(), selectedRow.createdDate);

  const date = format(
    selectedRow.createdDate,
    yearsDiff > 0 ? weekMonthDayFormatAndYear : weekMonthDayFormat,
  );
  return (
    <Box mt="auto">
      <Divider orientation="horizontal" light={true} />
      {/*className="border-top mt-auto d-flex justify-content-between align-items-center"*/}
      <Stack direction="row" p={1}>
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography variant="body1" color="text.secondary" component="span">
            {`Created on ${date}`}
          </Typography>
        </Box>

        <IconButton onClick={clickHandler} size="small" sx={{ width: 40, height: 40 }}>
          <Icons.Trash />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default Footer;
