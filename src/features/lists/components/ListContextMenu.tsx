import React, { useContext } from "react";
import { ClickEvent, ControlledMenu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { ListItemOperations } from "@/features/lists/ducks/constants/contextMenuOperations";

type Props = {
  menuProps: any;
  toggleMenu: (open?: boolean | undefined) => void;
  onItemClick: (e: ClickEvent) => void;

};

const ListContextMenu = React.forwardRef(
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
        <MenuItem value={ListItemOperations.Rename}>Rename list</MenuItem>
        <MenuItem value={ListItemOperations.Share}>Share list</MenuItem>
        <MenuItem value={ListItemOperations.Move}>Move list to...</MenuItem>
        <MenuItem value={ListItemOperations.Ungroup}>
          Remove from group
        </MenuItem>
        <MenuItem value={ListItemOperations.Copy}>Duplicate list</MenuItem>
        <MenuDivider />
        <MenuItem className="text-danger" value={ListItemOperations.Delete}>Delete list</MenuItem>
      </ControlledMenu>
    );
  },
);

export { ListContextMenu };
