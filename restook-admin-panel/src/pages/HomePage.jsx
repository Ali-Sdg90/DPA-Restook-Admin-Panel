import React, { useContext, useEffect } from "react";
import { Row, Spin } from "antd";
import { AuthContext } from "../store/AuthContextProvider";
import NewAdvertisementsList from "../components/NewLists/NewAdvertisementsList";
import NewRestaurantsList from "../components/NewLists/NewRestaurantsList";
import NewUsersList from "../components/NewLists/NewUsersList";
import { UserContext } from "../store/UserContextProvider";
import PageWrapper from "../components/Common/PageWrapper";

const HomePage = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const pageMode = () => {
        switch (userPlace) {
            case "default":
            case "home-page":
            case "new-advertisements":
                return <NewAdvertisementsList />;
            case "new-restaurants":
                return <NewRestaurantsList />;
            case "new-users":
                return <NewUsersList />;
            default:
                console.log("ERROR IN HomePage-pageMode", userPlace);
                setUserPlace("home-page");
        }
    };

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("home-page");
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

export default HomePage;
