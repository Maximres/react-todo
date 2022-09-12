import { IList } from "@/constants/types/listsTypes";
import { GroupList } from "@/features/lists/ducks/selectors/selectorListsAndGroupLists";

const isListItem = (value: IList | GroupList): value is IList => {
  return typeof (value as IList).groupId !== "undefined";
};

export { isListItem };
