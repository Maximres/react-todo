import { IGroup, IList } from "@/constants/types/listsTypes";
import { DragType, IGroupedList } from "../constants/types";
import { getOrderNumber } from "@/utils/helpers/order";
import { IOrderable } from "@/constants/types/stateTypes";

const getSourceItem = (dragEndItem: DragType, items: (IList | IGroupedList)[]) => {
  const isSubItem = !!dragEndItem.parentId;

  if (isSubItem) {
    const sourceGroup = items.find((x) => x.id === dragEndItem.parentId) as IGroupedList;
    const source = sourceGroup.lists?.find((x) => x.id === dragEndItem.id) as IList;
    return source;
  }
  const source = items.find((x) => x.id === dragEndItem.id) as IList;
  return source;
};

const getSiblingsOrderNumber = (items: (IList | IGroupedList)[], placement: number) => {
  let siblingDestItem = items[placement];
  let siblingsOrder =
    siblingDestItem != null
      ? siblingDestItem?.order
      : placement >= items.length
      ? getOrderNumber()
      : -1;
  return siblingsOrder;
};

const getDestItemPlacement = (destIndex: number, dropPosition: "above" | "inside" | "below") => {
  let placement = destIndex;
  if (dropPosition === "above") placement--;
  if (dropPosition === "below") placement++;
  return placement;
};

const getDragResultItem = (
  dragEndItem: DragType | null,
  dropItem: string | null,
  dropParentId: string | undefined,
  items: (IList | IGroupedList)[],
  dropType: "list" | "group",
  dropPosition: "above" | "inside" | "below",
) => {
  const didNotDrop = dragEndItem == null || dropItem == null;
  if (didNotDrop || dropItem === dragEndItem.id) {
    return;
  }

  const { type: dragType } = dragEndItem;

  //list dragged
  if (dragType === "list") {
    const moveListToTopLevel = !dropParentId;
    const moveListToSubGroup = !!dropParentId;
    const source = getSourceItem(dragEndItem, items);

    if (source == null) return;

    //list moved from sub to top level
    if (dropType === "list" && moveListToTopLevel) {
      const destItemIndex = items.findIndex((x) => x.id === dropItem);
      if (destItemIndex < 0) return;

      const placement = getDestItemPlacement(destItemIndex, dropPosition);
      const siblingsOrder = getSiblingsOrderNumber(items, placement);

      const destItem = items[destItemIndex];
      const meanOrder = (destItem.order + siblingsOrder) / 2.0;
      const srcCopy: IList = { ...source, order: meanOrder, groupId: "" };
      return srcCopy;
    }

    //list moved from sub level to another sub level
    if (dropType === "list" && moveListToSubGroup) {
      const destGroupIndex = items.findIndex((x) => x.id === dropParentId);
      if (destGroupIndex < 0) return;

      const destGroupItem = items[destGroupIndex] as IGroupedList;
      const destGroupItems = destGroupItem.lists ?? [];
      const destListItemIndex = destGroupItems.findIndex((x) => x.id === dropItem);
      if (destListItemIndex == null || destListItemIndex < 0) return;

      const placement = getDestItemPlacement(destListItemIndex, dropPosition);
      const siblingsOrder = getSiblingsOrderNumber(destGroupItems, placement);

      const destItem = destGroupItems[destListItemIndex];
      const meanOrder = (destItem.order + siblingsOrder) / 2.0;
      const srcCopy: IList = {
        ...source,
        order: meanOrder,
        groupId: dropParentId,
      };
      return srcCopy;
    }

    //list moved to top level NEXT to group
    if (dropType === "group" && dropPosition !== "inside") {
      const destGroupIndex = items.findIndex((x) => x.id === dropItem);
      if (destGroupIndex < 0) return;

      const placement = getDestItemPlacement(destGroupIndex, dropPosition);
      const siblingsOrder = getSiblingsOrderNumber(items, placement);

      const destGroupItem = items[destGroupIndex] as IGroupedList;
      const meanOrder = (destGroupItem.order + siblingsOrder) / 2.0;
      const srcCopy: IList = { ...source, order: meanOrder, groupId: "" };
      return srcCopy;
    }

    //list moved from anywhere to sub group
    if (dropType === "group" && dropPosition === "inside") {
      const destGroupIndex = items.findIndex((x) => x.id === dropItem);
      if (destGroupIndex < 0) return;

      const destGroupItem = items[destGroupIndex] as IGroupedList;
      const destGroupItems = destGroupItem.lists ?? [];
      const destListFirstItem = destGroupItems[0];
      let siblingsOrder = getOrderNumber();
      if (destListFirstItem != null) {
        siblingsOrder = destListFirstItem.order;
      }
      const lowerOrder = siblingsOrder - 1;
      const srcCopy: IList = {
        ...source,
        order: lowerOrder,
        groupId: destGroupItem.id,
      };
      return srcCopy;
    }
  }

  if (dragType === "group") {
    const destIndex = items.findIndex((x) => x.id === dropItem);
    if (destIndex < 0) return;

    const placement = getDestItemPlacement(destIndex, dropPosition);
    const siblingsOrder = getSiblingsOrderNumber(items, placement);

    const destItem = items[destIndex] as IOrderable;
    const meanOrder = (destItem.order + siblingsOrder) / 2.0;

    const source = items.find((x) => x.id === dragEndItem.id) as IGroupedList;
    const srcCopy: IGroup = {
      ...source,
      order: meanOrder,
    };

    return srcCopy;
  }
};

export { getDragResultItem };
