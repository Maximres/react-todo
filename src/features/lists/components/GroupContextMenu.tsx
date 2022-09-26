import React from "react";
import { ClickEvent, ControlledMenu, MenuDivider, MenuItem } from "@szhsin/react-menu";
import { GroupItemOperations } from "../ducks/constants/contextMenuOperations";

type Props = {
  menuProps: any;
  toggleMenu: (open?: boolean | undefined) => void;
  onItemClick: (e: ClickEvent) => void;
  isDeletable: boolean;
};

const GroupContextMenu = React.forwardRef(
  ({ menuProps, toggleMenu, onItemClick, isDeletable }: Props, anchorRef) => {
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
        <MenuItem value={GroupItemOperations.Add}>New list</MenuItem>
        {!isDeletable && <MenuItem value={GroupItemOperations.Ungroup}>Ungroup list</MenuItem>}
        {isDeletable && (
          <>
            <MenuDivider />
            <MenuItem className="text-danger" value={GroupItemOperations.Delete}>
              Delete group
            </MenuItem>
          </>
        )}
      </ControlledMenu>
    );
  },
);

export { GroupContextMenu };
