import React, {useCallback, useContext} from "react";
import {AppContext} from "./AppContext";

const UseAppContext = () => {
    return useContext(AppContext);
}

export default UseAppContext