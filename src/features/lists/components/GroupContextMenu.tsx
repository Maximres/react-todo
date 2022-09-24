import React from "react";
import { ClickEvent, ControlledMenu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { GroupItemOperations } from "../ducks/constants/contextMenuOperations";

type Props = {
  menuProps: any;
  toggleMenu: (open?: boolean | undefined) => void;
  onItemClick: (e: ClickEvent) => void
};


const GroupContextMenu = React.forwardRef(
  ({ menuProps, toggleMenu, onItemClick }: Props, anchorRef) => {

    return (
      <ControlledMenu
        {...menuProps}
        anchorRef={anchorRef}
        viewScroll="close"
        captureFocus={true}
        onClose={() => toggleMenu(false)}
        boundingBoxPadding="0 0 0 20"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onItemClick={onItemClick}
      >
        <MenuItem value={GroupItemOperations.Rename}>Rename group</MenuItem>
        <MenuItem value={GroupItemOperations.Create}>New list</MenuItem>
        <MenuItem value={GroupItemOperations.Ungroup}>Ungroup list</MenuItem>
        <MenuDivider />
        <MenuItem value={GroupItemOperations.Delete}>Delete group</MenuItem>
      </ControlledMenu>
    );
  },
);

export { GroupContextMenu };
