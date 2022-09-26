import React from "react";
import { ClickEvent, ControlledMenu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { ListItemOperations } from "@/features/lists/ducks/constants/contextMenuOperations";
import { IGroup } from "@/constants/types/listsTypes";
import _isEmpty from "lodash/isEmpty";

type Props = {
  menuProps: any;
  toggleMenu: (open?: boolean | undefined) => void;
  onItemClick: (e: ClickEvent) => void;
  groups?: IGroup[];
};

const ListContextMenu = React.forwardRef(
  ({ menuProps, toggleMenu, onItemClick, groups }: Props, anchorRef) => {
    const canMove = !_isEmpty(groups);
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
        {canMove && (
          <>
            <SubMenu label="Move list to..." direction="bottom">
              {groups!.map((x) => (
                <MenuItem value={[ListItemOperations.Move, x.id]}>{x.name}</MenuItem>
              ))}
            </SubMenu>
          </>
        )}
        {canMove && <MenuItem value={ListItemOperations.Ungroup}>Remove from group</MenuItem>}
        <MenuItem value={ListItemOperations.Copy}>Duplicate list</MenuItem>
        <MenuDivider />
        <MenuItem className="text-danger" value={ListItemOperations.Delete}>
          Delete list
        </MenuItem>
      </ControlledMenu>
    );
  },
);

export { ListContextMenu };
