import React, { useContext, useEffect } from "react";
import { CommonContext } from "../../store/CommonContextProvider";
import { AuthContext } from "../../store/AuthContextProvider";
import { getRequest } from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const PageWrapper = ({ children }) => {
    const { localToken, setToastifyObj } = useContext(CommonContext);
    const { userData, setUserData } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const getProfile = async () => {
            if (localToken) {
                const res = await getRequest(
                    "/auth/profile",
                    true,
                    setToastifyObj
                );

                setUserData({
                    access_token: localToken,
                    user: res,
                });
            } else {
                navigate("/login");
            }
        };

        if (!userData.access_token.length) {
            getProfile();
        } else {
            // console.log("NO NEED FOR getProfile()", userData);
        }
    }, [localToken, setUserData, userData]);

    return <>{children}</>;
};

export default PageWrapper;
