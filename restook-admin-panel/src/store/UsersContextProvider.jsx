import React, { createContext } from "react";

const usersContext = createContext();

const UsersContextProvider = ({ children }) => {
    return <usersContext.Provider value={{}}>{children}</usersContext.Provider>;
};

export default UsersContextProvider;
