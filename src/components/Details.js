import React from "react";
import {AppContext} from "../contexts/AppContext";
import {
    File,
    MyDay
} from "../utils/IconsComponent";
import {Types} from "../App";
import RowDetailsEditor from "./RowDetailsEditor";
import RowDetailsCalendar from  "./RowDetailsReminder";
import RowDetailsMyDay from "./RowDetailsMyDay";

export class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTaskFocused: false,
            newTaskValue: ""
        }
    }

    static contextType = AppContext;

    closeDetails = () => {
        const ctx = this.context;
        ctx.dispatch({type: Types.TOGGLE_SIDEBAR, payload: {isSidebarVisible: false}})
    }

    render = () => {
        const ctx = this.context
        const selectedRow = ctx.selectedRow;
        return (ctx.state.isSidebarVisible) &&
            <aside className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white overflow-auto"
                   style={{width: "380px"}} id="details">
                <div className="d-flex align-items-center flex-shrink-0 pt-3 px-3 mx-3 link-dark justify-content-end">
                        <button type="button" className="btn-close" aria-label="Close" onClick={this.closeDetails}/>
                </div>

                {selectedRow && <RowDetailsEditor/>}

                <RowDetailsMyDay/>


                {selectedRow && <RowDetailsCalendar/>}

                <div className="m-3">
                    <div className="list-group ">

                        <label className="list-group-item group-item-height d-flex justify-content-between align-items-center">
                            <span className="me-3">
                                <File onClick={() => {
                                }}/>
                            </span>
                            <span className="form-control me-1" type="text" onFocus={() => ({})}>Add file</span>
                        </label>
                    </div>
                </div>


                <div className="m-3">
                    <div className="list-group ">
                        <label className="list-group-item group-item-height d-flex justify-content-between align-items-center">
                        <textarea rows={3} className="form-control overflow-hidden"
                                  placeholder="Add note"
                                  value={() => ({})}
                                  onKeyPress={() => ({})}
                                  onChange={() => ({})}
                                  aria-label="..."/>
                        </label>
                    </div>
                </div>

            </aside>
    }
}