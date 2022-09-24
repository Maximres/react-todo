import React, { useContext } from "react";
import { ControlledMenu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { ListItemOperations } from "@/features/lists/ducks/constants/contextMenuOperations";

type Props = {
  menuProps: any;
  toggleMenu: (open?: boolean | undefined) => void;
};

const ListContextMenu = React.forwardRef(
  ({ menuProps, toggleMenu }: Props, anchorRef) => {
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
        onItemClick={(e) => {
          const value = e.value as ListItemOperations;
          switch (value) {
            case ListItemOperations.Rename:
              break;
            case ListItemOperations.Share:
              break;
            case ListItemOperations.Move:
              break;
            case ListItemOperations.Ungroup:
              break;
            case ListItemOperations.Copy:
              break;
            case ListItemOperations.Delete:
              break;
          }
        }}
      >
        <MenuItem value={ListItemOperations.Rename}>Rename list</MenuItem>
        <MenuItem value={ListItemOperations.Share}>Share list</MenuItem>
        <MenuItem value={ListItemOperations.Move}>Move list to...</MenuItem>
        <MenuItem value={ListItemOperations.Ungroup}>
          Remove from group
        </MenuItem>
        <MenuItem value={ListItemOperations.Copy}>Duplicate list</MenuItem>
        <MenuDivider />
        <MenuItem value={ListItemOperations.Delete}>Delete list</MenuItem>
      </ControlledMenu>
    );
  },
);

export { ListContextMenu };
