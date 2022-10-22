import React, { useEffect, useRef } from "react";
import {
  ControlledMenu,
  MenuCloseEvent,
  MenuDivider,
  MenuItem,
  useMenuState,
} from "@szhsin/react-menu";
import { ContextMenuReminder } from "@/features/details/ducks/constants/contextMenuReminder";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { ReminderDatePickerPopper } from "@/features/details/components/reminder/ReminderDatePickerPopper";

type Props = {
  onItemClick: (type: any, value?: number) => void;
  render: (props: RenderProps) => React.ReactNode;
  reminder?: number;
};

type RenderProps = {
  anchorRef: React.RefObject<any>;
  onClick?: () => void;
  onKeyDown?: () => void;
};

const ReminderOperations = ({ onItemClick, render, reminder }: Props) => {
  const [menuProps, toggleMenu] = useMenuState();
  const menuAnchorRef = useRef(null);
  const datepickerButtonRef = useRef<HTMLElement | null>(null);

  const popupState = usePopupState({
    variant: "popper",
    popupId: "demoPopover",
  });

  useEffect(() => {
    if (!popupState.isOpen && menuProps.state === "open") {
      datepickerButtonRef.current?.focus();
    }
  }, [popupState.isOpen, menuProps.state]);

  const handleClose = () => {
    popupState.close();
  };

  const onAccept = (value?: number) => {
    onItemClick(ContextMenuReminder.Custom, value);
    toggleMenu(false);
  };

  const handleMenuClose = (event: MenuCloseEvent) => {
    const togglableItems = Object.values(ContextMenuReminder).filter(
      (x) => x !== ContextMenuReminder.Custom,
    );
    if (!popupState.isOpen || togglableItems.includes(event.value)) {
      handleClose();
      toggleMenu(false);
    }
  };

  return (
    <>
      {render({
        anchorRef: menuAnchorRef,
        onClick: () => {
          toggleMenu(true);
        },
      })}

      <ControlledMenu
        {...menuProps}
        anchorRef={menuAnchorRef}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onItemClick={(event) => {
          onItemClick(event.value);
        }}
        onClose={handleMenuClose}
        align="center"
        captureFocus={true}
        menuItemFocus={{
          position: "first",
        }}
      >
        <MenuItem onClick={() => {}} value={ContextMenuReminder.LaterToday}>
          Later today
        </MenuItem>
        <MenuItem value={ContextMenuReminder.Tomorrow}>Tomorrow</MenuItem>
        <MenuItem value={ContextMenuReminder.NextWeek}>Next week</MenuItem>
        <MenuDivider />
        <MenuItem
          {...bindTrigger(popupState)}
          ref={datepickerButtonRef}
          onClick={(event) => {
            event.keepOpen = true;
            event.stopPropagation = true;
            popupState.toggle(event.syntheticEvent.target as HTMLElement);
          }}
          value={ContextMenuReminder.Custom}
        >
          Pick a date & time
        </MenuItem>
      </ControlledMenu>
      <ReminderDatePickerPopper reminder={reminder} popupState={popupState} onAccept={onAccept} />
    </>
  );
};

export { ReminderOperations };
