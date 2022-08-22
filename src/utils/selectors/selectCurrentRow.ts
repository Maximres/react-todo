import { RootState } from "../../app/store/store";
import { IRow } from "../../constants/types/appTypes";

type cacheType = { [key: string]: IRow | undefined };

const selectCurrentRow = (state: RootState) => {
  //todo: change to weakMap or use lib
  const cache: cacheType = {};

  return ((cache: cacheType): IRow | undefined => {
    if (!state.app.selectedRowId) return undefined;

    const localCacheCreated = (cache = cache || {});
    const cacheElementExits = cache[state.app.selectedRowId];
    const foundElement = (cache[state.app.selectedRowId] = state.app.tasks.find(
      (x) => x.id === state.app.selectedRowId,
    ));
    return (localCacheCreated && cacheElementExits) || foundElement;
  })(cache);
};

export default selectCurrentRow;
