import React, { useContext, useEffect } from "react";
import { Spin } from "antd";
import { AuthContext } from "../store/AuthContextProvider";
import { UserContext } from "../store/UserContextProvider";
import { ExternalAdvertContextProvider } from "../store/ExternalAdvertContextProvider";
import PageWrapper from "../components/Common/PageWrapper";
import RestaurantProfileMenu from "../components/Restaurant/RestaurantProfileMenu";
import RestaurantInfo from "../components/Restaurant/RestaurantInfo";
import RestaurantAdvertList from "../components/Restaurant/RestaurantAdvertList";
import NewRestaurantAdvert from "../components/Restaurant/NewRestaurantAdvert";
import RestaurantAdvertInfo from "../components/Restaurant/RestaurantAdvertInfo";
import RestaurantResumeList from "../components/Restaurant/RestaurantResumeList";
import RestaurantGallery from "../components/Restaurant/RestaurantGallery";
import RestaurantTransactionsList from "../components/Restaurant/RestaurantTransactionsList";

const ExternalAdver = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const pageMode = () => {
        if (
            userPlace === "default" ||
            userPlace.includes("restaurant-profile")
        ) {
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
        } else if (userPlace.includes("restaurant-advert-info")) {
            return <RestaurantAdvertInfo />;
        } else if (userPlace.includes("restaurant-resume-list")) {
            return <RestaurantResumeList />;
        } else if (userPlace.includes("restaurant-gallery")) {
            return <RestaurantGallery />;
        } else if (userPlace.includes("restaurant-transactions")) {
            return <RestaurantTransactionsList />;
        } else {
            console.log("ERROR IN RestaurantProfile-pageMode", userPlace);
            setUserPlace("restaurant-profile");
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
