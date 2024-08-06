import React from "react";
import AuthContextProvider from "./AuthContextProvider";
import UsersContextProvider from "./UsersContextProvider";

const StoreProvider = ({ children }) => {
    return (
        <AuthContextProvider>
            <UsersContextProvider>{children}</UsersContextProvider>
        </AuthContextProvider>
    );
};

export default StoreProvider;
