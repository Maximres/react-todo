import React, {useState} from "react";
import './App.css';
import {Table} from "./ToDo/Table";
import {Details} from "./ToDo/Details";
import {SidebarContext} from "./Helpers/SidebarContext"



function App() {
    const [isSidebarVisible, toggleSideBar] = useState(false)

    const value = {
        isSidebarVisible,
        toggleSideBar: () => {toggleSideBar(!isSidebarVisible)}};
    return <SidebarContext.Provider value={value}>
        <>
            <Table/>
            <Details/>
        </>
    </SidebarContext.Provider>;
}

export default App;
