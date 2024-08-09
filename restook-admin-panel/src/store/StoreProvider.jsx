import React from "react";
import AuthContextProvider from "./AuthContextProvider";
import UsersContextProvider from "./UserContextProvider";
import CommonContextProvider from "./CommonContextProvider";

const StoreProvider = ({ children }) => {
    return (
        <CommonContextProvider>
            <AuthContextProvider>
                <UsersContextProvider>{children}</UsersContextProvider>
            </AuthContextProvider>
        </CommonContextProvider>
    );
};

export default StoreProvider;
