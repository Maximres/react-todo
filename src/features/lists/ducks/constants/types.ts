import { IList } from "@/constants/types/listsTypes";

export type DropPosition = "above" | "inside" | "below";

export type DndElement = "list" | "group";

export type IGroupedList = {
  id: string;
  name: string;
  order: number;
  lists?: IList[];
};

export type DragType = {
  id: string;
  type: DndElement;
  parentId: string | undefined;
};
