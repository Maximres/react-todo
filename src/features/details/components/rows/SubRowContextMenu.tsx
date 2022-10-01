import { ClickEvent, Menu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import Icons from "@/components/AppIcons";
import { SubItemOperations } from "../../ducks/constants/contextMenuOperations";
import React from "react";

type Props = {
  isChecked: boolean;
  onItemClick: (e: ClickEvent) => void;
};

const SubRowContextMenu = React.forwardRef(({ isChecked, onItemClick }: Props, ref: any) => (
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
    onItemClick={onItemClick}
  >
    {isChecked && (
      <MenuItem value={SubItemOperations.ToggleComplete}>Mark as not completed</MenuItem>
    )}
    {!isChecked && (
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
));

export { SubRowContextMenu };
