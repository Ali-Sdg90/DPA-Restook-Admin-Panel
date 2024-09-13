import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    // const [userPlace, setUserPlace] = useState("default");
    // const [userPlace, setUserPlace] = useState("external-advert-profile-1720");
    // const [userPlace, setUserPlace] = useState("create-new-restaurant");
    const [userPlace, setUserPlace] = useState("restaurant-adverts-list-79");

    useEffect(() => {
        console.log("userPlace >>", userPlace);
    }, [userPlace]);

    return (
        <UserContext.Provider value={{ userPlace, setUserPlace }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
