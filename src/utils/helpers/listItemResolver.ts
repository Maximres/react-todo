import { IList } from "@/constants/types/listsTypes";
import { IGroupedList } from "@/features/lists/ducks/selectors/selectorListsAndGroupLists";

const isListItem = (value: IList | IGroupedList): value is IList => {
  return typeof (value as IList).groupId !== "undefined";
};

export { isListItem };
