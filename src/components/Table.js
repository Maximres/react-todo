import React, {Component} from "react"
import {Rows} from "./Rows";
import {AppContext} from "../contexts/AppContext";
import {Types} from "../App";

export class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            newTaskText: "",
        }
    }

    static contextType = AppContext;

    componentDidUpdate() {
        //empty

    }

    toggleFocus = () => {
        this.setState({isFocused: !this.state.isFocused})
    }

    handleNewTaskSubmit = (e) => {
        e.preventDefault()
        if (!this.state.newTaskText)
            return;

        let ctx = this.context;
        ctx.dispatch({type: Types.CREATE_TASK, payload: this.state.newTaskText})
        this.setState({newTaskText: ""})
    }

    handleCheck = (task) => {
        let ctx = this.context;
        ctx.dispatch({type: Types.TOGGLE_CHECKED, payload: {task: task, isChecked: !task.isChecked}})
    }

    toggleFavorite = (task) => {
        const ctx = this.context;
        ctx.dispatch( {type: Types.TOGGLE_FAVORITE, payload: {task: task, isFavorite: !task.isFavorite}})
    }

    renderRows = (tasks) => {
        return <Rows tasks={tasks}
                     handleCheck={this.handleCheck}
                     toggleFavorite={this.toggleFavorite}/>
    }

    render = () => {
        let ctx = this.context;
        return <main className="bg-light flex-fill position-relative">
            <div className="container-fluid my-5 overflow-auto vh-100">
                <div className="row px-5">
                    <div className="col-12">
                        <table className="table table-striped table-hover col-12">
                            <tbody>
                            {this.renderRows(ctx.state.tasks.filter(x => !x.isChecked))}
                            </tbody>

                        </table>
                        <table className="table table-striped table-hover table-secondary">
                            <tbody>
                            {this.renderRows(ctx.state.tasks.filter(x => x.isChecked))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div
                    className="row position-absolute input-text-inline-position bottom-0 py-3 pb-4 bg-light bg-opacity-75">
                    <form onSubmit={this.handleNewTaskSubmit}>
                        <div className="input-group flex-nowrap input-group-pad">
                            {this.state.isFocused || !!this.state.newTaskText
                                ? <div className="input-group-text">
                                    <input className="form-check-input" value="" type="radio"
                                           onChange={this.handleNewTaskSubmit}/>
                                </div>
                                : <span className="input-group-text" id="add-task">+</span>
                            }
                            <input onFocus={this.toggleFocus}
                                   onBlur={this.toggleFocus}
                                   value={this.state.newTaskText}
                                   onChange={(e) => {
                                       this.setState({newTaskText: e.target.value})
                                   }}
                                   className="form-control" type="text" placeholder="Add a task"
                                   aria-describedby="add-task"/>
                        </div>
                    </form>
                </div>

            </div>

        </main>
    }
}

