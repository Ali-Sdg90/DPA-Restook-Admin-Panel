import React, { useContext, useEffect } from "react";
import { Row, Spin } from "antd";
import { CommonContext } from "../store/CommonContextProvider";
import { getRequest } from "../services/apiService";
import { AuthContext } from "../store/AuthContextProvider";
import NewAdvertisements from "../components/NewAdvertisements";
import NewRestaurants from "../components/NewRestaurants";
import NewUsers from "../components/NewUsers";
import { UserContext } from "../store/UserContextProvider";

const HomePage = () => {
    const { localToken } = useContext(CommonContext);
    const { userData, setUserData } = useContext(AuthContext);
    const { userPlace, setUserPlace } = useContext(UserContext);

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

    const pageMode = () => {
        switch (userPlace) {
            case "default":
            case "home-page":
            case "new-advertisements":
                return <NewAdvertisements />;
            case "new-restaurants":
                return <NewRestaurants />;
            case "new-users":
                return <NewUsers />;
            default:
                console.log("ERROR IN HomePage-pageMode", userPlace);
        }
    };

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("home-page");
        }
    }, [userPlace, setUserPlace]);

    return (
        <>
            {userData.access_token.length ? (
                <Row gutter={[24, 24]} className="content">
                    {pageMode()}
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </>
    );
};

export default HomePage;
