import { RootState } from "../../configs/redux";

const selectCurrentRow = (state: RootState) => {
  return state.details.task;
};

export default selectCurrentRow;
