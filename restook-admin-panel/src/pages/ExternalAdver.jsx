import React, { useContext, useEffect, useState } from "react";
import { Row, Spin } from "antd";
import { AuthContext } from "../store/AuthContextProvider";
import { UserContext } from "../store/UserContextProvider";
import PageWrapper from "../components/PageWrapper";
import ExternalAdverList from "../components/ExternalAdvertList";
import ExternalAdvertProfile from "../components/ExternalAdvertProfile";

const ExternalAdver = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const pageMode = () => {
        if (userPlace === "default" || userPlace === "external-advert-list") {
            return <ExternalAdverList />;
        } else if (userPlace.includes("external-advert-profile")) {
            return <ExternalAdvertProfile />;
        } else {
            console.log("ERROR IN ExternalAdver-pageMode", userPlace);
        }
    };

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("external-advert-list");
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
