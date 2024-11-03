import React, { useContext, useEffect } from "react";
import { Spin } from "antd";
import { AuthContext } from "../store/AuthContextProvider";
import { UserContext } from "../store/UserContextProvider";
import PageWrapper from "../components/Common/PageWrapper";
import TransactionsList from "../components/Shared/TransactionsList";

const TransactionsListPage = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("transaction-list");
        }
    }, [userPlace, setUserPlace]);

    return (
        <PageWrapper>
            {userData.access_token.length ? (
                <TransactionsList resID={""} />
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default TransactionsListPage;
