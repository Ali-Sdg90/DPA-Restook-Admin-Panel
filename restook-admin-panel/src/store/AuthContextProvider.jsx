import React, { createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
