import { RootState } from "./store";
import { IRow } from "../types/appTypes";

const selectCurrentRow = (state: RootState) => {
  //todo: change to weakMap or use lib
  const cache: any[] = [];

  return ((cache: any[]): IRow | null => {
    if (!state.app.selectedRowId) return null;

    const localCacheCreated = (cache = cache || []);
    const cacheElementExits = cache[state.app.selectedRowId];
    const foundElement = (cache[state.app.selectedRowId] = state.app.tasks.find(
      (x) => x.id === state.app.selectedRowId,
    ));
    const foundElementCopy = { ...foundElement };
    return (localCacheCreated && cacheElementExits) || foundElementCopy;
  })(cache);
};

export default selectCurrentRow;
