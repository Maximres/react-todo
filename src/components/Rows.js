import React, {Component} from "react";
import {Favorite} from "../utils/FavoriteComponent";
import {AppContext} from "../contexts/AppContext";
import PropTypes from "prop-types"
import {Types} from "../App";

class Rows extends Component {
    constructor(props) {
        super(props);
    }

    static contextType = AppContext

    static propTypes = {
        handleCheck: PropTypes.func,
        toggleFavorite: PropTypes.func
    }

    handleToggleFavorite = (e, row) => {
        e.stopPropagation();
        this.props.toggleFavorite(row)
    }

    toggleSideBar = (task) => {
        let ctx = this.context;
        ctx.dispatch({type: Types.TOGGLE_SIDEBAR, payload:  {task: task, isSidebarVisible: !ctx.state.isSidebarVisible}})
    }

    render = () => {
        return this.props.tasks && this.props.tasks.map(row => (<tr className="row" key={row.id} onClick={(e) => this.toggleSideBar(row)}>
                    <td className="px-1 col-1"  >
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="form-check">
                                <input type="checkbox" className="form-check-input"
                                       onClick={e => e.stopPropagation()}
                                       checked={row.isChecked}
                                       onChange={() => this.props.handleCheck(row)}/>
                            </div>
                        </div>
                    </td>
                    <td className="px-1 col">
                            {row.text}
                    </td>
                    <td className="px-1 col-1" >
                        <Favorite isFavorite={row.isFavorite} onClick={(e) => this.handleToggleFavorite(e, row)} />
                    </td>
                </tr>
            )
        )
    }
}

export {Rows};

