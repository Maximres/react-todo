import { IGroup, IList } from "@/constants/types/listsTypes";
import { ListGroupNames } from "@/features/tasks/ducks/constants/constants";

const getUntitledCount = (collection: IGroup[] | IList[] = [], name: ListGroupNames) => {
  const untitledCount = collection.filter((x) => x.name.startsWith(name)).length;
  return untitledCount;
};

const getUntitledName = (collection: IGroup[] | IList[], name: ListGroupNames) => {
  const untitledCount = getUntitledCount(collection, name);
  const number = untitledCount > 0 ? untitledCount : "";
  const result = `${name} ${number}`.trimEnd();
  return result;
};

export { getUntitledName };
