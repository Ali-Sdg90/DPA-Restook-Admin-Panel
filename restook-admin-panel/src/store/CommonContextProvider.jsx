import React, { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CommonContext = createContext();

const CommonContextProvider = ({ children }) => {
    const [toastifyObj, setToastifyObj] = useState({
        title: "",
        mode: "",
    });

    const [localToken, setLocalToken] = useLocalStorage(
        "restook_token",
        ""
    );

    useEffect(() => {
        console.timeLog("toastifyObj >>", toastifyObj);
    }, [toastifyObj]);

    return (
        <CommonContext.Provider
            value={{ toastifyObj, setToastifyObj, localToken, setLocalToken }}
        >
            {children}
        </CommonContext.Provider>
    );
};

export default CommonContextProvider;
