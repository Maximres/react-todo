import React, {Component} from "react";
import {Favorite} from "../utils/IconsComponent";
import {AppContext, IRow} from "../contexts/AppContext";
import {ActionTypes} from "../App";
import useAppContext from "../contexts/UseAppContext";

type Props = {
    tasks: IRow[],
    toggleFavorite: (arg: IRow) => void,
    handleCheck: (arg: IRow) => void
}

const Rows = ({tasks, toggleFavorite, handleCheck}: Props): JSX.Element | null => {
    const ctx = useAppContext();

    const handleToggleFavorite = (e: any, row: IRow) => {
        e.stopPropagation();
        toggleFavorite(row)
    }

    const toggleSideBar = (task: IRow) => {
        ctx.dispatch({
            type: ActionTypes.TOGGLE_SIDEBAR,
            payload: {task: task, isSidebarVisible: !ctx.state.isSidebarVisible}
        })
    }

    const elements = tasks.map(row => (<tr className="row" key={row.id} onClick={() => toggleSideBar(row)}>
        <td className="px-1 col-1">
            <div className="d-flex justify-content-center align-items-center">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input"
                           onClick={e => e.stopPropagation()}
                           checked={row.isChecked}
                           onChange={() => handleCheck(row)}/>
                </div>
            </div>
        </td>
        <td className="px-1 col">
            {row.text}
        </td>
        <td className="px-1 col-1">
            <Favorite isFavorite={row.isFavorite} onClick={(e: any) => handleToggleFavorite(e, row)}/>
        </td>
    </tr>));

    return tasks ? <>{elements}</> : null

}

export {Rows};

