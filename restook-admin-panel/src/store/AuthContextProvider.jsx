import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        access_token: "",
        user: "",
    });

    // useEffect(() => {
    //     console.log("userData >>", userData);
    // }, [userData]);

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
