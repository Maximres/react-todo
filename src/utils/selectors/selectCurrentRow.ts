import { RootState } from "../../constants/types/redux";

const selectCurrentRow = (state: RootState) => {
  return state.details.task;
};

export default selectCurrentRow;
