import React, {Component} from "react"
import {Rows} from "./Rows";
import {SidebarContext} from "../App";

export class Table extends Component {
    constructor(props) {
        super(props);
        const rowsData = [
            {id: Math.random(), isChecked: true, text: "lorem11", isFavorite: true},
            {id: Math.random(), isChecked: true, text: "lorem10", isFavorite: true},
            {id: Math.random(), isChecked: false, text: "lorem12", isFavorite: false},
        ];
        this.state = {
            isFocused: false,
            newTask: "",
            tasks: rowsData,
            completedTasks: []
        }
    }


    componentDidUpdate() {
        //empty

    }

    toggleFocus = () => {
        this.setState({isFocused: !this.state.isFocused})
    }

    handleNewTaskSubmit = (e) => {
        e.preventDefault()
        if (!this.state.newTask)
            return;

        this.setState({
            tasks: [{
                id: Math.random(),
                isChecked: false,
                text: this.state.newTask,
                isFavorite: false
            }, ...this.state.tasks]
        })
        this.setState({newTask: ""})

    }

    handleCheck = (task) => {
        task.isChecked = !task.isChecked;
        let filtered = this.state.tasks.filter(x => x.id !== task.id);
        this.setState({tasks: [...filtered, task]})
    }

    toggleFavorite = (task) => {
        task.isFavorite = !task.isFavorite;
        this.setState({tasks: [...this.state.tasks]})
    }

    renderRows = (tasks) => {
        return <Rows tasks={tasks}
                     handleCheck={this.handleCheck}
                     toggleFavorite={this.toggleFavorite}/>
    }

    render = () => {
        return <main className="bg-light flex-fill position-relative">
            <div className="container-fluid my-5 overflow-auto vh-100">
                <div className="row px-5">
                    <div className="col-12">
                        <table className="table table-striped table-hover col-12">
                            <tbody>
                            {this.renderRows(this.state.tasks.filter(x => !x.isChecked))}
                            </tbody>

                        </table>
                        <table className="table table-striped table-hover table-secondary">
                            <tbody>
                            {this.renderRows(this.state.tasks.filter(x => x.isChecked))}
                            </tbody>
                        </table>
                    </div>

                </div>
                <div
                    className="row position-absolute input-text-inline-position bottom-0 py-3 pb-4 bg-light bg-opacity-75">
                    <form onSubmit={this.handleNewTaskSubmit}>
                        <div className="input-group flex-nowrap input-group-pad">
                            {this.state.isFocused || !!this.state.newTask
                                ? <div className="input-group-text">
                                    <input className="form-check-input" value="" type="radio"
                                           onChange={this.handleNewTaskSubmit}/>
                                </div>
                                : <span className="input-group-text" id="add-task">+</span>
                            }
                            <input onFocus={this.toggleFocus}
                                   onBlur={this.toggleFocus}
                                   value={this.state.newTask}
                                   onChange={(e) => {
                                       this.setState({newTask: e.target.value})
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

