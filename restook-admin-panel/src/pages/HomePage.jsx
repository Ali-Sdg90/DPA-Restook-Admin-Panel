import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../store/CommonContextProvider";
import { getRequest } from "../services/apiService";
import { AuthContext } from "../store/AuthContextProvider";

import { Row } from "antd";
import NewAdvertisements from "../components/NewAdvertisements";
import NewRestaurants from "../components/NewRestaurants";

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
    }, [localToken, setUserData, userData]);

    return (
        <Row gutter={[24, 24]} className="content">
            {/* <NewAdvertisements /> */}
            <NewRestaurants />
        </Row>
    );
};

export default HomePage;
