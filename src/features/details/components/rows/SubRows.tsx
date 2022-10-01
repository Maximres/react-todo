import { ISubTask } from "@/constants/types/tasksTypes";
import React, { useRef } from "react";
import { SubRowCheckBox } from "@/features/details/components/rows/SubRowCheck";
import { SubRowText } from "@/features/details/components/rows/SubRowText";
import { ClickEvent, Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import Icons from "@/components/AppIcons";
import { SubItemOperations } from "../../ducks/constants/contextMenuOperations";

type Props = {
  subTask: ISubTask;
  onItemClick: (e: ClickEvent, subTask: ISubTask) => void;
};

const SubRows = ({ subTask, onItemClick }: Props) => {
  const ref = useRef(null);

  return (
    <div
      className="list-group-item d-flex justify-content-between align-items-center"
      key={subTask.id}
      ref={ref}
    >
      <SubRowCheckBox uid={subTask.id} isChecked={subTask.isChecked} />
      <SubRowText uid={subTask.id} text={subTask.text} isChecked={subTask.isChecked} />
      <Menu
        menuButton={
          <div>
            <Icons.Options className="px-2" />
          </div>
        }
        boundingBoxRef={ref}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onItemClick={(e) => {
          onItemClick(e, subTask);
        }}
      >
        {subTask.isChecked && (
          <MenuItem value={SubItemOperations.ToggleComplete}>Mark as not completed</MenuItem>
        )}
        {!subTask.isChecked && (
          <>
            <MenuItem value={SubItemOperations.ToggleComplete}>Mark as completed</MenuItem>
            <MenuItem value={SubItemOperations.Promote}>Promote to task</MenuItem>
          </>
        )}

        <MenuDivider />
        <MenuItem value={SubItemOperations.Delete} className="text-danger">
          Delete step
        </MenuItem>
      </Menu>
    </div>
  );
};

export { SubRows };
