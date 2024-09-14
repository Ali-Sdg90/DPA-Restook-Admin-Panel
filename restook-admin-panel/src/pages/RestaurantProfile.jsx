import React, { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { AuthContext } from "../store/AuthContextProvider";
import { UserContext } from "../store/UserContextProvider";
import { ExternalAdvertContextProvider } from "../store/ExternalAdvertContextProvider";
import PageWrapper from "../components/Common/PageWrapper";
import RestaurantProfileMenu from "../components/Restaurant/RestaurantProfileMenu";
import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
import RestaurantAdvertList from "../components/Restaurant/RestaurantAdvertList";
import NewRestaurantAdvert from "../components/Restaurant/NewRestaurantAdvert";

const ExternalAdver = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const pageMode = () => {
        if (
            userPlace === "default" ||
            userPlace.includes("restaurant-profile")
        ) {
            // return <RestaurantProfileMenu />;
            return <RestaurantProfileMenu />;
        } else if (userPlace.includes("restaurant-info")) {
            return (
                <ExternalAdvertContextProvider
                    mainAPI={"/restaurants/"}
                    onlyFirstCard={true}
                    haveAdvertData={false}
                    rootUserPlace={`restaurant-profile`}
                >
                    <RestaurantInfo />
                </ExternalAdvertContextProvider>
            );
        } else if (userPlace.includes("restaurant-adverts-list")) {
            return <RestaurantAdvertList />;
        } else if (userPlace.includes("new-restaurant-advert")) {
            return (
                <ExternalAdvertContextProvider
                    mainAPI={"/restaurants/"}
                    onlyFirstCard={false}
                    haveAdvertData={false}
                    rootUserPlace={"restaurant-adverts-list"}
                >
                    <NewRestaurantAdvert />
                </ExternalAdvertContextProvider>
            );
        } else {
            console.log("ERROR IN RestaurantProfile-pageMode", userPlace);
        }
    };

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("restaurant-profile");
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

export default ExternalAdver;
