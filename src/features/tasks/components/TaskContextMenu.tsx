import React from "react";
import { ClickEvent, ControlledMenu, MenuDivider, MenuItem, SubMenu } from "@szhsin/react-menu";
import { TaskItemOperations } from "@/features/tasks/ducks/constants/contextMenuOperations";
import _isEmpty from "lodash/isEmpty";
import { IList } from "@/constants/types/listsTypes";
import { ITask } from "@/constants/types/tasksTypes";
import { formatDueDateValue } from "@/utils/helpers/formatDueDateValue";

type Props = {
  menuProps: any;
  toggleMenu: (open?: boolean | undefined) => void;
  onItemClick: (e: ClickEvent) => void;
  anchorPoints?: { x: number; y: number };
  task?: ITask;
  lists?: IList[];
};

const TaskContextMenu = ({
  menuProps,
  toggleMenu,
  onItemClick,
  anchorPoints,
  task,
  lists,
}: Props) => {
  const canMove = !_isEmpty(lists);
  const isChecked = task && task.isChecked;
  const isImportant = task && task.isImportant;
  const isMyDay = task && task.isMyDay;
  const isDueDate = task && task.dueDate != null;
  const dueDate = formatDueDateValue(task?.dueDate);
  return (
    <ControlledMenu
      {...menuProps}
      anchorPoint={anchorPoints}
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
      <MenuItem value={TaskItemOperations.ToggleMyDay}>
        {isMyDay ? "Remove from my day" : "Add to my day"}
      </MenuItem>
      <MenuItem value={TaskItemOperations.ToggleImportance}>
        {isImportant ? "Mark as not important" : "Mark as important"}
      </MenuItem>
      <MenuItem value={TaskItemOperations.ToggleCheck}>
        {isChecked ? "Mark as not completed" : "Mark as completed"}
      </MenuItem>
      <MenuDivider />
      {dueDate !== "Today" && <MenuItem value={TaskItemOperations.DueToday}>Due today</MenuItem>}
      {dueDate !== "Tomorrow" && (
        <MenuItem value={TaskItemOperations.DueTomorrow}>Due tomorrow</MenuItem>
      )}

      <MenuItem value={TaskItemOperations.PickDate}>Pick a date</MenuItem>
      {isDueDate && <MenuItem value={TaskItemOperations.RemoveDue}>Remove due date</MenuItem>}

      {canMove && (
        <>
          <MenuDivider />
          <SubMenu label="Move task to..." direction="bottom">
            {lists!.map((x) => (
              <MenuItem key={x.id} value={[TaskItemOperations.Move, x.id]}>
                {x.name}
              </MenuItem>
            ))}
          </SubMenu>
        </>
      )}
      <MenuDivider />
      <MenuItem className="text-danger" value={TaskItemOperations.Delete}>
        Delete list
      </MenuItem>
    </ControlledMenu>
  );
};

export { TaskContextMenu };
