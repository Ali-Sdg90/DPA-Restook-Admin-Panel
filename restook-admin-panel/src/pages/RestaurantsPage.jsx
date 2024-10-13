import React, { useContext, useEffect } from "react";
import { Spin } from "antd";
import { AuthContext } from "../store/AuthContextProvider";
import { UserContext } from "../store/UserContextProvider";
import PageWrapper from "../components/Common/PageWrapper";
import RestaurantsList from "../components/Restaurant/RestaurantsList";
import CreateNewRestaurant from "../components/Restaurant/CreateNewRestaurant";

const HomePage = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const pageMode = () => {
        switch (userPlace) {
            case "default":
            case "restaurants-list":
                return <RestaurantsList />;
            case "create-new-restaurant":
                return <CreateNewRestaurant />;
            default:
                console.log("ERROR IN RestaurantsPage-pageMode", userPlace);
                setUserPlace("restaurants-list");
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
                <>{pageMode()}</>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default HomePage;
