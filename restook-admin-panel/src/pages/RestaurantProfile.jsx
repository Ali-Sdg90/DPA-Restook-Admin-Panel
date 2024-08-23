import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContextProvider";
import { Button, Card, Col, Row, Spin } from "antd";

import { ReactComponent as PhoneIcon } from "../assets/images/restaurants-page/Phone (1).svg";
import { ReactComponent as PowerIcon } from "../assets/images/restaurants-page/Power (1).svg";

import { ReactComponent as CardUserIcon } from "../assets/images/restaurants-page/User (2).svg";
import { ReactComponent as CardAlertIcon } from "../assets/images/restaurants-page/Alert.svg";
import { ReactComponent as CardCreditCardIcon } from "../assets/images/restaurants-page/Credit Card (3).svg";
import { ReactComponent as CardImageIcon } from "../assets/images/restaurants-page/Image - 3.svg";
import { ReactComponent as CardNoteIcon } from "../assets/images/restaurants-page/Note - Text (3).svg";
import { ReactComponent as CardTicketIcon } from "../assets/images/restaurants-page/Ticket.svg";
import { ReactComponent as CardLeftArrowIcon } from "../assets/images/restaurants-page/Chevron - Left (1).svg";
import ImageWithFallback from "../components/ImageWithFallback";
import PageWrapper from "../components/PageWrapper";
import { AuthContext } from "../store/AuthContextProvider";
import { useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../services/apiService";

const RestaurantProfile = () => {
    const { userData } = useContext(AuthContext);
    const { id } = useParams();
    const [restaurantData, setRestaurantData] = useState();

    useEffect(() => {
        if (id) {
            console.log("id >>", id);

            const getData = async () => {
                const res = await getRequest(`/restaurants/${id}`);

                console.log("REST-Prof >>", res);

                if (res.success) {
                    setRestaurantData(res.data);
                } else {
                    console.log(`ERROR IM /restaurants/${id}`);
                }
            };

            getData();
        }
    }, [id]);

    const cardData = [
        {
            title: "اطلاعات مجموعه",
            icon: <CardUserIcon />,
            bgColor: "#EFF1FE",
            borderColor: "rgba(93, 106, 242, 0.50)",
        },
        {
            title: "آگهی‌ها",
            icon: <CardNoteIcon />,
            bgColor: "#EBF8EF",
            borderColor: "rgba(46, 184, 92, 0.20)",
        },
        {
            title: "گالری مجموعه",
            icon: <CardImageIcon />,
            bgColor: "#F5E9F8",
            borderColor: "#CB8FD9",
        },
        {
            title: "تراکنش ها و امور مالی",
            icon: <CardCreditCardIcon />,
            bgColor: "#E8F6FE",
            borderColor: "#7FCAF9",
        },
        {
            title: "کد تخفیف اختصاصی",
            icon: <CardTicketIcon />,
            bgColor: "#FDDFD3",
            borderColor: "#F9A07A",
        },
        {
            title: "گزارش‌های تخلف",
            icon: <CardAlertIcon />,
            bgColor: "#FDF4D3",
            borderColor: "#F9DD7A",
        },
    ];

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

        const res = await patchRequest(`/restaurants/${id}`, {
            adminStatus: newState,
        });

        if (res.success) {
            setRestaurantData((prevData) => ({
                ...prevData,
                adminStatus: newState,
            }));
        } else {
            console.error("ERROR IN PATCH");
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
                                {cardData.map((item, index) => (
                                    <Col span={12} key={index}>
                                        <Card
                                            style={{
                                                background: item.bgColor,
                                                borderColor: item.borderColor,
                                            }}
                                            className="card-container"
                                        >
                                            <div className="card-info">
                                                {item.icon} {item.title}
                                            </div>
                                            <div className="card-arrow">
                                                <CardLeftArrowIcon />
                                            </div>
                                        </Card>
                                    </Col>
                                ))}
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

export default RestaurantProfile;
