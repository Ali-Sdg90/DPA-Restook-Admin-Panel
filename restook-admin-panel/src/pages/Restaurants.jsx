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
        switch (userPlace) {
            case "default":
            case "restaurants-list":
                return <RestaurantsList />;
            case "restaurant-profile":
                return <RestaurantProfile />;
            default:
                console.log("ERROR IN HomePage-pageMode", userPlace);
        }
    };

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
