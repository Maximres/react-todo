import { ISubTask } from "@/constants/types/tasksTypes";
import React, { useRef } from "react";
import { SubRowCheckBox } from "@/features/details/components/rows/SubRowCheck";
import { SubRowText } from "@/features/details/components/rows/SubRowText";
import { ClickEvent } from "@szhsin/react-menu";
import { SubRowContextMenu } from "@/features/details/components/rows/SubRowContextMenu";
import { Divider, Stack } from "@mui/material";

type Props = {
  subTask: ISubTask;
  onItemClick: (e: ClickEvent, subTask: ISubTask) => void;
};

const SubRows = ({ subTask, onItemClick }: Props) => {
  const boundingBoxRef = useRef(null);

  const onContextItemClick = (e: ClickEvent) => {
    onItemClick(e, subTask);
  };

  return (
    <>
      <Stack ref={boundingBoxRef} direction="row" sx={{ height: 40 }}>
        <SubRowCheckBox uid={subTask.id} isChecked={subTask.isChecked} />
        <SubRowText uid={subTask.id} text={subTask.text} isChecked={subTask.isChecked} />
        <SubRowContextMenu
          ref={boundingBoxRef}
          isChecked={subTask.isChecked}
          onItemClick={onContextItemClick}
        />
      </Stack>
      <Divider light={true} orientation="horizontal" sx={{ ml: "40px", mr: "15px" }} />
    </>
  );
};

export { SubRows };
