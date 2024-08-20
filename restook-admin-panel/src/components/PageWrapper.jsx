import React, { useContext, useEffect } from "react";
import { CommonContext } from "../store/CommonContextProvider";
import { AuthContext } from "../store/AuthContextProvider";
import { getRequest } from "../services/apiService";

const PageWrapper = ({ children }) => {
    const { localToken } = useContext(CommonContext);
    const { userData, setUserData } = useContext(AuthContext);

    useEffect(() => {
        const getProfile = async () => {
            if (localToken) {
                const res = await getRequest("/auth/profile");

                console.log("SET >>", res);

                setUserData({
                    access_token: localToken,
                    user: res,
                });
            }
        };

        if (!userData.access_token.length) {
            getProfile();
        } else {
            console.log("NO NEED FOR getProfile()", userData);
        }
    }, [localToken, setUserData, userData]);

    return <>{children}</>;
};

export default PageWrapper;
