import React, {Component} from "react";
import {Favorite} from "../Helpers/FavoriteComponent";
import {SidebarContext} from "../Helpers/SidebarContext";

class Rows extends Component {
    constructor(props) {
        super(props);
    }

    handleToggleFavorite = (e, row) => {
        e.stopPropagation();
        this.props.toggleFavorite(row)
    }

    render = () => {
        let ctx = this.context;

        return this.props.tasks && this.props.tasks.map(row => (<tr className="row" key={row.id} onClick={(e) => ctx.toggleSideBar()}>
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

Rows.contextType = SidebarContext;

export {Rows};

