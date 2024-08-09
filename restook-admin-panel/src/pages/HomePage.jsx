import React, { useContext, useEffect } from "react";
import { CommonContext } from "../store/CommonContextProvider";
import { getRequest } from "../services/apiService";
import { AuthContext } from "../store/AuthContextProvider";

const HomePage = () => {
    const { localToken } = useContext(CommonContext);
    const { userData, setUserData } = useContext(AuthContext);

    useEffect(() => {
        const getProfile = async () => {
            if (localToken) {
                const res = await getRequest("/auth/profile");

                console.log("res >>", res);

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
    }, []);

    

    return (
        <div>
            <h1>Home Page</h1>
        </div>
    );
};

export default HomePage;
