import React, { useContext, useEffect, useState } from "react";
import PageWrapper from "../Common/PageWrapper";
import { Col, Row, Spin } from "antd";
import { UserContext } from "../../store/UserContextProvider";
import { AuthContext } from "../../store/AuthContextProvider";
import { getRequest } from "../../services/apiService";

import AdvertReviewFirstCard from "../AdvertReview/AdvertReviewFirstCard";
import AdvertReviewInfo from "../AdvertReview/AdvertReviewInfo";
import AdvertReviewConditions from "../AdvertReview/AdvertReviewConditions";
import AdvertReviewAdvantages from "../AdvertReview/AdvertReviewAdvantages";
import AdvertActionBtns from "../AdvertReview/AdvertActionBtns";
import AdvertActionModal from "./../AdvertReview/AdvertActionModal";

const RestaurantAdvertInfo = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const [id, setId] = useState();

    const [advertData, setAdvertData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldRefetchData, setShouldRefetchData] = useState(true);

    useEffect(() => {
        setId(userPlace.match(/\d+/g));
    }, []);

    useEffect(() => {
        if (id && shouldRefetchData) {
            console.log("id >>", id);

            const getData = async () => {
                const res = await getRequest(`/advertisements/${id}`);

                console.log("Advert-Prof >>", res);

                if (res.success) {
                    setAdvertData(res.data);
                } else {
                    console.log(`ERROR in /restaurants/${id}`);
                }
            };

            getData();
            setShouldRefetchData(false);
        }
    }, [id, shouldRefetchData]);

    return (
        <PageWrapper>
            {userData.access_token.length && advertData && id ? (
                <Row gutter={[24, 24]} className="content advert-review">
                    <Col span={24} className="table-section">
                        <AdvertReviewFirstCard
                            advertData={advertData}
                            showBtns={false}
                            backAddress={"restaurant-adverts-list"}
                        />
                        <AdvertActionBtns
                            resumeCounter={advertData.resumeCounter}
                            setIsModalOpen={setIsModalOpen}
                            advertId={id}
                        />
                        <AdvertReviewInfo
                            advertData={advertData}
                            setIsModalOpen={setIsModalOpen}
                            hasEditBtn={false}
                        />
                        <AdvertReviewConditions advertData={advertData} />
                        <AdvertReviewAdvantages advertData={advertData} />
                        <AdvertActionModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            advertId={id}
                        />
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default RestaurantAdvertInfo;
