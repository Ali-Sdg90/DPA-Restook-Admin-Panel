import React, { useContext, useEffect, useState } from "react";
import PageWrapper from "../components/Common/PageWrapper";
import { Col, Row, Spin } from "antd";
import { UserContext } from "../store/UserContextProvider";
import { AuthContext } from "../store/AuthContextProvider";
import { useParams } from "react-router-dom";
import { getRequest } from "../services/apiService";

import AdvertReviewFirstCard from "../components/AdvertReview/AdvertReviewFirstCard";
import AdvertReviewInfo from "../components/AdvertReview/AdvertReviewInfo";
import AdvertReviewConditions from "../components/AdvertReview/AdvertReviewConditions";
import AdvertReviewAdvantages from "../components/AdvertReview/AdvertReviewAdvantages";
import AdvertReviewModal from "../components/AdvertReview/AdvertReviewModal";
import { CommonContext } from "../store/CommonContextProvider";

const AdvertisementReview = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);
    const { setToastifyObj } = useContext(CommonContext);

    const { id } = useParams();

    const [advertData, setAdvertData] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldRefetchData, setShouldRefetchData] = useState(true);

    useEffect(() => {
        if (id && shouldRefetchData) {
            console.log("id >>", id);

            const getData = async () => {
                const res = await getRequest(
                    `/advertisements/${id}`,
                    true,
                    setToastifyObj
                );

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
            {userData.access_token.length && advertData ? (
                <Row gutter={[24, 24]} className="content advert-review">
                    <Col span={24} className="table-section">
                        <AdvertReviewFirstCard
                            advertData={advertData}
                            id={id}
                            showBtns={true}
                            backAddress={""}
                        />
                        <AdvertReviewInfo
                            advertData={advertData}
                            setIsModalOpen={setIsModalOpen}
                            hasEditBtn={true}
                        />
                        <AdvertReviewConditions advertData={advertData} />
                        <AdvertReviewAdvantages advertData={advertData} />
                        <AdvertReviewModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            advertData={advertData}
                            id={id}
                            setShouldRefetchData={setShouldRefetchData}
                        />
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default AdvertisementReview;
