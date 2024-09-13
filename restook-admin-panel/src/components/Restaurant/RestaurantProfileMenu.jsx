import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Row, Spin } from "antd";

import { ReactComponent as PhoneIcon } from "../../assets/images/restaurants-page/Phone (1).svg";
import { ReactComponent as PowerIcon } from "../../assets/images/restaurants-page/Power (1).svg";

import { ReactComponent as CardLeftArrowIcon } from "../../assets/images/restaurants-page/Chevron - Left (1).svg";
import { AuthContext } from "../../store/AuthContextProvider";
import { useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";
import { restaurantProfileCardsConstants } from "../../constants/restaurantProfileCardsConstants";
import ImageWithFallback from "../../components/Common/ImageWithFallback";
import PageWrapper from "../../components/Common/PageWrapper";
import { UserContext } from "../../store/UserContextProvider";

const RestaurantProfileMenu = () => {
    const { id } = useParams();

    const [restaurantData, setRestaurantData] = useState();

    const { userData } = useContext(AuthContext);
    const { setToastifyObj } = useContext(CommonContext);
    const { userPlace, setUserPlace } = useContext(UserContext);

    useEffect(() => {
        if (id) {
            console.log("id >>", id);

            const getData = async () => {
                const res = await getRequest(`/restaurants/${id}`);

                console.log("REST-Prof >>", res);

                if (res.success) {
                    setRestaurantData(res.data);
                } else {
                    console.log(`ERROR in /restaurants/${id}`);
                }
            };

            getData();
        }
    }, [id]);

    const dataChecker = (data) => {
        if (data) {
            return data;
        } else {
            return "_";
        }
    };

    const changeRestaurantStatus = async (currentStatus) => {
        let newState = "ACTIVE";

        if (currentStatus === "ACTIVE") {
            newState = "INACTIVE";
        }

        const res = await patchRequest(
            `/restaurants/${id}`,
            {
                adminStatus: newState,
            },
            true,
            setToastifyObj
        );

        if (res.success) {
            setRestaurantData((prevData) => ({
                ...prevData,
                adminStatus: newState,
            }));
        } else {
            console.error("ERROR IN PATCH");
        }
    };

    const cardClickHandler = (index) => {
        console.log("click on ", index);

        switch (index) {
            case 0:
                setUserPlace(`restaurant-info-${id}`);
                break;
            case 1:
                setUserPlace(`restaurant-adverts-list-${id}`);
                break;
            default:
                console.log("You click on", index);
        }
    };

    return (
        <PageWrapper>
            {userData.access_token.length &&
            restaurantData &&
            restaurantData.adminStatus ? (
                <Row gutter={[24, 24]} className="content">
                    <Col span={24} className="table-section">
                        <Card className="restaurant-profile">
                            <Row className="top-section">
                                <div className="right-section">
                                    <Row>
                                        <div className="restaurant-image-container">
                                            <ImageWithFallback
                                                imageUrl={
                                                    restaurantData.imageUrl
                                                }
                                                className={"restaurant-image"}
                                                alt={"restaurant-image"}
                                            />
                                        </div>

                                        <div className="restaurant-info-container">
                                            <div className="restaurant-title">
                                                {restaurantData.jobTitle}
                                            </div>

                                            <div className="restaurant-info">
                                                <div className="restaurant-address">
                                                    آدرس:{" "}
                                                    {dataChecker(
                                                        restaurantData
                                                            .contacts[0].address
                                                    )}
                                                </div>
                                                <div className="restaurant-branch">
                                                    شعبه:{" "}
                                                    {dataChecker(
                                                        restaurantData.branch
                                                    )}
                                                </div>
                                                <div className="restaurant-phone">
                                                    شماره تماس:{" "}
                                                    {dataChecker(
                                                        restaurantData
                                                            .contacts[0]
                                                            .phoneNumber
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </div>

                                <div className="left-section">
                                    <Button
                                        className="active-profile-btn"
                                        type="primary"
                                        icon={<PowerIcon />}
                                        style={{
                                            background:
                                                restaurantData.adminStatus ===
                                                "ACTIVE"
                                                    ? "#2EB85C"
                                                    : "#E45353",
                                        }}
                                        onClick={() =>
                                            changeRestaurantStatus(
                                                restaurantData.adminStatus
                                            )
                                        }
                                    >
                                        {restaurantData.adminStatus === "ACTIVE"
                                            ? "پروفایل فعال"
                                            : "پروفایل غیرفعال"}
                                    </Button>

                                    <a
                                        href={`tel:${restaurantData.phoneNumber}`}
                                    >
                                        <Button
                                            className="call-restaurant"
                                            icon={<PhoneIcon />}
                                        >
                                            تماس با مجموعه
                                        </Button>
                                    </a>
                                </div>
                            </Row>

                            <Row className="bottom-section" gutter={[32, 24]}>
                                {restaurantProfileCardsConstants.map(
                                    (item, index) => (
                                        <Col span={12} key={index}>
                                            <Card
                                                style={{
                                                    background: item.bgColor,
                                                    borderColor:
                                                        item.borderColor,
                                                }}
                                                className="card-container"
                                                onClick={() =>
                                                    cardClickHandler(index)
                                                }
                                            >
                                                <div className="card-info">
                                                    {item.icon} {item.title}
                                                </div>
                                                <div className="card-arrow">
                                                    <CardLeftArrowIcon />
                                                </div>
                                            </Card>
                                        </Col>
                                    )
                                )}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default RestaurantProfileMenu;
