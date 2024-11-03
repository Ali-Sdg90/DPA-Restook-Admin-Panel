import React, { useContext, useEffect, useState } from "react";

import { Spin } from "antd";

import { AuthContext } from "../../store/AuthContextProvider";
import { UserContext } from "../../store/UserContextProvider";

import PageWrapper from "../../components/Common/PageWrapper";
import TransactionsList from "../../components/Shared/TransactionsList";

const RestaurantTransactionsList = () => {
    const { userPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const [id, setId] = useState();

    useEffect(() => {
        setId(userPlace.match(/\d+/g));
    }, []);

    return (
        <PageWrapper>
            {userData.access_token.length && id ? (
                <TransactionsList resID={id} />
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default RestaurantTransactionsList;
