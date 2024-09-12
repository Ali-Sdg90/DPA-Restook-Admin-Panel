import React, { useContext, useEffect, useState } from "react";
import { Spin } from "antd";
import { AuthContext } from "../store/AuthContextProvider";
import { UserContext } from "../store/UserContextProvider";
import ExternalAdvertList from "../components/ExternalAdvert/ExternalAdvertList";
import { ExternalAdvertContextProvider } from "../store/ExternalAdvertContextProvider";
import ExternalAdvertProfile from "../components/ExternalAdvert/ExternalAdvertProfile";
import PageWrapper from "../components/Common/PageWrapper";

const ExternalAdver = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const pageMode = () => {
        if (userPlace === "default" || userPlace === "external-advert-list") {
            return <ExternalAdvertList />;
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
                <ExternalAdvertContextProvider mainAPI={"/temp/tempAdDetail?id="}>
                    {pageMode()}
                </ExternalAdvertContextProvider>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default ExternalAdver;
