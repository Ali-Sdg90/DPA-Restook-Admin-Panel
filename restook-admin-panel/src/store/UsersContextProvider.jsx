import React, { createContext } from "react";

export const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
    return <UsersContext.Provider value={{}}>{children}</UsersContext.Provider>;
};

export default UsersContextProvider;
