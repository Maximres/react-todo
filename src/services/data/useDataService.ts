import { useMemo } from "react";
import { dataService } from "./dataService";

const useDataService = () => {
  return useMemo(() => {
    return dataService;
  }, []);
};

export { useDataService };
