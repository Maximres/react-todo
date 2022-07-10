import React from "react";
import {SidebarContext} from "../Helpers/SidebarContext";
import {Favorite} from "../Helpers/FavoriteComponent";

export class Details extends React.Component {

    static contextType = SidebarContext;

    render = () => {
        const ctx = this.context
        return (ctx && ctx.isSidebarVisible) &&
            <aside className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white overflow-auto"
                   style={{width: "380px"}}
                    id="details">
                <a href="/"
                   className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">

                    <span className="fs-5 fw-semibold">List group</span>
                </a>
                <div className="m-3">
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <input className="form-check-input me-1" type="checkbox" aria-label="..."/>
                            <textarea rows={1} className="form-control me-1 overflow-hidden" aria-label="..."/> {/*//todo prevent enter keyword*/}
                            <Favorite/>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <input className="form-check-input me-1" type="checkbox" aria-label="..."/>
                            <textarea rows={1} className="form-control me-1 overflow-hidden" aria-label="..."/> {/*//todo prevent enter keyword*/}
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <span className="me-1" id="add-task">+</span>

                            <input className="form-control me-1" type="text" placeholder={"New step"} aria-label="..."/>
                        </li>
                        <li className="list-group-item">
                            <input className="form-check-input me-1" type="checkbox" value="" aria-label="..."/>
                            Fourth checkbox
                        </li>
                        <li className="list-group-item">
                            <input className="form-check-input me-1" type="checkbox" value="" aria-label="..."/>
                            Fifth checkbox
                        </li>
                    </ul>
                </div>
                <div className="m-3">
                    <div className="list-group ">

                        <label className="list-group-item">
                            <input className="form-control me-1" type="text" />
                        </label>
                        <label className="list-group-item">
                            <input className="form-control me-1" type="text" />
                        </label>
                        <label className="list-group-item">
                            <input className="form-control me-1" type="text" />
                        </label>
                    </div>
                </div>
                <div className="m-3">
                    <div className="list-group ">

                        <label className="list-group-item">
                            <input className="form-control me-1" type="text" />
                        </label>
                        <label className="list-group-item">
                            <input className="form-control me-1" type="text" />
                        </label>
                        <label className="list-group-item">
                            <input className="form-control me-1" type="text" />
                        </label>
                    </div>
                </div>

            </aside>
    }
}