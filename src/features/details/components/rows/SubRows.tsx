import { ISubTask } from "@/constants/types/tasksTypes";
import React, { useRef } from "react";
import { SubRowCheckBox } from "@/features/details/components/rows/SubRowCheck";
import { SubRowText } from "@/features/details/components/rows/SubRowText";
import { ClickEvent } from "@szhsin/react-menu";
import { SubRowContextMenu } from "@/features/details/components/rows/SubRowContextMenu";

type Props = {
  subTask: ISubTask;
  onItemClick: (e: ClickEvent, subTask: ISubTask) => void;
};

const SubRows = ({ subTask, onItemClick }: Props) => {
  const ref = useRef(null);

  const onContextItemClick = (e: ClickEvent) => {
    onItemClick(e, subTask);
  };

  return (
    <div
      className="list-group-item d-flex justify-content-between align-items-center"
      key={subTask.id}
      ref={ref}
    >
      <SubRowCheckBox uid={subTask.id} isChecked={subTask.isChecked} />
      <SubRowText uid={subTask.id} text={subTask.text} isChecked={subTask.isChecked} />
      <SubRowContextMenu ref={ref} isChecked={subTask.isChecked} onItemClick={onContextItemClick} />
    </div>
  );
};

export { SubRows };
