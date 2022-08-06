import React from "react";
import {AppContext} from "../contexts/AppContext";
import {Favorite} from "../utils/FavoriteComponent";
import {
    Calendar,
    CalendarRepeat,
    Clock,
    ClockRotate,
    Close,
    File,
    MyDay, NextWeek,
    Options, Reminder,
    Tomorrow
} from "../utils/IconsComponent";
import {Types} from "../App";
import {RowDetailsEditor} from "./RowDetailsEditor";

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
        const selectedRow = ctx.state.selectedRow;
        return (ctx.state.isSidebarVisible) &&
            <aside className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white overflow-auto"
                   style={{width: "380px"}} id="details">
                <div className="d-flex align-items-center flex-shrink-0 pt-3 px-3 mx-3 link-dark justify-content-end">
                        <button type="button" className="btn-close" aria-label="Close" onClick={this.closeDetails}/>
                </div>

                {selectedRow && <RowDetailsEditor/>}

                <div className="m-3">
                    <div className="list-group ">

                        <label className="list-group-item d-flex justify-content-between align-items-center pointer">
                            <span className="me-3">
                                <MyDay onClick={() => {
                                }}/>
                            </span>
                            <span className="form-control me-1" type="text" onFocus={() => ({})}>Add to My Day</span>
                        </label>
                    </div>
                </div>

                <div className="m-3">
                    <div className="list-group ">

                        <label className="list-group-item dropdown">
                            <div className="d-flex justify-content-between align-items-center pointer"
                                 id="dropdownMenuButton1"
                                 data-bs-toggle="dropdown"
                                 aria-expanded="false">
                                      <span className="me-3">
                                            <Reminder onClick={() => {
                                            }}/>
                                     </span>
                                <span className="form-control me-1"
                                      onFocus={() => ({})}>Remind me
                                    </span>
                            </div>

                            <ul className="dropdown-menu" style={{width: "300px"}} aria-labelledby="dropdownMenuButton1">
                                <li className="dropdown-item">
                                    <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <ClockRotate/>
                                        </span>
                                        <button type="button" className="border-0 bg-transparent" >Later today</button>
                                    </div>
                                </li>
                                <li className="dropdown-item">
                                    <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Tomorrow/>
                                        </span>
                                        <button type="button" className="border-0 bg-transparent" >Tomorrow</button>

                                    </div>
                                </li>
                                <li className="dropdown-item">
                                    <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <NextWeek/>
                                        </span>
                                        <button type="button" className="border-0 bg-transparent" >Next week</button>

                                    </div>
                                </li>
                                <li><hr className="dropdown-divider"/></li>
                                <li className="dropdown-item">
                                    <div className="d-flex align-items-center">
                                        <span className="me-2">
                                            <Clock/>
                                        </span>
                                        <button type="button" className="border-0 bg-transparent" >Pick a date & time</button>
                                    </div>
                                </li>
                            </ul>

                        </label>
                        <label className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="me-3">
                                <Calendar onClick={() => {
                                }}/>
                            </span>
                            <span className="form-control me-1" type="text" onFocus={() => ({})}>Add due date</span>
                        </label>
                        <label className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="me-3">
                                <CalendarRepeat onClick={() => {
                                }}/>
                            </span>
                            <span className="form-control me-1" type="text" onFocus={() => ({})}>Repeat</span>
                        </label>
                    </div>
                </div>


                <div className="m-3">
                    <div className="list-group ">

                        <label className="list-group-item d-flex justify-content-between align-items-center">
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
                        <label className="list-group-item d-flex justify-content-between align-items-center">
                        <textarea rows={2} className="form-control overflow-hidden"
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