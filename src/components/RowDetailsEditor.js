import React, {useContext, useState} from "react";
import {Favorite} from "../utils/FavoriteComponent";
import {Options} from "../utils/IconsComponent";
import {AppContext} from "../contexts/AppContext";
import {Types} from "../App";

const RowDetailsEditor = () => {
    const ctx = useContext(AppContext);
    const selectedRow = ctx.selectedRow;
    const [newTaskFocused, setNewTaskFocus] = useState(false);
    const [newTaskValue, setNewTaskValue] = useState("");

    const handleCheck = (task) => {
        ctx.dispatch({type: Types.TOGGLE_CHECKED, payload: {task: task, isChecked: !task.isChecked}});
    }

    const handleSubCheck = (subTask) => {
        const selectedTask = ctx.selectedRow;
        const selectedSubTask = selectedTask.subTasks.find(x => x.id === subTask.id);
        selectedSubTask.isChecked = !selectedSubTask.isChecked;
        ctx.dispatch({type: Types.UPDATE_TASK, payload: selectedTask});
    }

    const handleNewTaskCheck = (e) => {
        const task = ctx.selectedRow;
        task.subTasks = [...task.subTasks, {
            id: Math.random(),
            isChecked: false,
            text: newTaskValue
        }]
        ctx.dispatch({type: Types.UPDATE_TASK, payload: task});
        setNewTaskFocus(false);
        setNewTaskValue("")
    }

    const handleTextChange = (e, task) => {
        task.text = e.target.value;
        ctx.dispatch({type: Types.UPDATE_TASK, payload: task});
    }

    const toggleFavorite = () => {
        const row = ctx.selectedRow;
        ctx.dispatch({type: Types.TOGGLE_FAVORITE, payload: {task: row, isFavorite: !row.isFavorite}});
    }

    const handleSubCheckOnEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.currentTarget.blur();
            handleNewTaskCheck(e)
        }
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    return (<div className="m-3">
        <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center flex-fill">
                <input className="form-check-input me-3 p-2 flex-shrink-0" type="checkbox"
                       checked={selectedRow.isChecked}
                       onChange={() => handleCheck(selectedRow)}/>
                <textarea rows={1}
                          className="form-control me-1 overflow-hidden fw-bolder fs-4"
                          data-main-row-title={true}
                          value={selectedRow.text}
                          onKeyPress={handleEnterKeyPress}
                          onChange={e => handleTextChange(e, selectedRow)}/>

                <Favorite isFavorite={selectedRow.isFavorite} onClick={toggleFavorite}/>
            </li>

            {selectedRow && selectedRow.subTasks && selectedRow.subTasks.map(subTask => {
                return <li className="list-group-item d-flex justify-content-between align-items-center"
                           key={subTask.id}>
                    <input className="form-check-input flex-shrink-0 me-3" type="checkbox"
                           checked={subTask.isChecked}
                           onChange={() => handleSubCheck(subTask)}/>
                    <textarea rows={1}
                              className={"form-control me-1 overflow-hidden " + (subTask.isChecked ? "text-decoration-line-through" : "")}
                              value={subTask.text}
                              onKeyPress={handleEnterKeyPress}
                              onChange={e => handleTextChange(e, subTask)}/>
                    <div className="mx-2">
                        <Options/>
                    </div>
                </li>
            })}
            <li className="list-group-item d-flex justify-content-between align-items-center">
                {!newTaskFocused && !newTaskValue
                    ? <>
                        <span className="me-3" id="add-task">+</span>
                        <input className="form-control me-1" type="text" placeholder={"New step"}
                               onFocus={() => setNewTaskFocus(true)}
                        />
                    </>
                    : <>
                        <input className="form-check-input me-3 flex-shrink-0" type="checkbox"
                               onChange={handleNewTaskCheck} aria-label="..."/>
                        <textarea rows={1} className="form-control me-4 overflow-hidden"
                                  autoFocus={newTaskFocused}
                                  onBlur={() => setNewTaskFocus(false)}
                                  value={newTaskValue}
                                  onKeyPress={handleSubCheckOnEnter}
                                  onChange={e => setNewTaskValue(e.target.value)}
                                  aria-label="..."/>
                    </>
                }
            </li>
        </ul>
    </div>)
}

export default RowDetailsEditor;