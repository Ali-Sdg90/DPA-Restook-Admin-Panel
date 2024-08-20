import React, { useContext, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { UserContext } from "../store/UserContextProvider";
import { AuthContext } from "../store/AuthContextProvider";
import { Row, Spin } from "antd";
import RestaurantsList from "../components/RestaurantsList";
import RestaurantProfile from "../components/RestaurantProfile";

const Restaurants = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const pageMode = () => {
        if (userPlace === "default" || userPlace === "restaurants-list") {
            return <RestaurantsList />;
        } else if (userPlace.includes("restaurant-profile-")) {
            return <RestaurantProfile />;
        } else {
            console.log("ERROR IN Restaurant-pageMode", userPlace);
        }
    };

    useEffect(() => {
        console.log("userPlace =>", userPlace);
        pageMode();
    }, [userPlace]);

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("restaurants-list");
        }
    }, [userPlace, setUserPlace]);

    return (
        <PageWrapper>
            {userData.access_token.length ? (
                <Row gutter={[24, 24]} className="content">
                    {pageMode()}
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default Restaurants;
