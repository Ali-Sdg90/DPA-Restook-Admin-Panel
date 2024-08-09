import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const { userPlace, setUserPlace } = useState("login-page");

    return (
        <UserContext.Provider value={{ userPlace, setUserPlace }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
