import React from "react";
import Icons from "../../../components/AppIcons";
import { IRow } from "../../../constants/types/appTypes";
import { useAppDispatch } from "../../../configs/redux";
import { toggleSelected } from "../mainSlice";

type Props = {
  tasks: IRow[];
  toggleFavorite: (arg: IRow) => void;
  handleCheck: (arg: IRow) => void;
};

const Tasks = ({
  tasks,
  toggleFavorite,
  handleCheck,
}: Props): JSX.Element | null => {
  const dispatch = useAppDispatch();

  const handleToggleFavorite = (e: any, row: IRow) => {
    e.stopPropagation();
    toggleFavorite(row);
  };

  const toggleSideBar = (task: IRow) => {
    dispatch(toggleSelected({ task: task }));
  };

  const elements = tasks.map((row) => (
    <tr className="row" key={row.id} onClick={() => toggleSideBar(row)}>
      <td className="px-1 col-1">
        <div className="d-flex justify-content-center align-items-center">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onClick={(e) => e.stopPropagation()}
              checked={row.isChecked}
              onChange={() => handleCheck(row)}
            />
          </div>
        </div>
      </td>
      <td className="px-1 col">{row.text}</td>
      <td className="px-1 col-1">
        <Icons.Favorite
          isFavorite={row.isFavorite}
          onClick={(e: any) => handleToggleFavorite(e, row)}
        />
      </td>
    </tr>
  ));

  return tasks ? <>{elements}</> : null;
};

export { Tasks };
