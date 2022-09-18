import { IList } from "@/constants/types/listsTypes";
import { DragType, IGroupedList } from "../constants/types";
import { getOrderNumber } from "@/utils/helpers/order";

const getSourceItem = (
  dragEndItem: DragType,
  items: (IList | IGroupedList)[],
) => {
  const isSubItem = !!dragEndItem.parentId;

  if (isSubItem) {
    const sourceGroup = items.find(
      (x) => x.id === dragEndItem.parentId,
    ) as IGroupedList;
    const source = sourceGroup.lists?.find(
      (x) => x.id === dragEndItem.id,
    ) as IList;
    return source;
  }
  const source = items.find((x) => x.id === dragEndItem.id) as IList;
  return source;
};

const getSiblingsOrderNumber = (
  items: (IList | IGroupedList)[],
  placement: number,
) => {
  let siblingDestItem = items[placement];
  let siblingsOrder =
    siblingDestItem != null
      ? siblingDestItem?.order
      : placement >= items.length
      ? getOrderNumber()
      : -1;
  return siblingsOrder;
};

const getDestItemPlacement = (
  destIndex: number,
  dropPosition: "above" | "inside" | "below",
) => {
  let placement = destIndex;
  if (dropPosition === "above") placement--;
  if (dropPosition === "below") placement++;
  return placement;
};

export { getSourceItem, getSiblingsOrderNumber, getDestItemPlacement };
