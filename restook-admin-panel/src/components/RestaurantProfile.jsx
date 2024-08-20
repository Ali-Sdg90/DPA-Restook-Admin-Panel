import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../store/UserContextProvider";
import { Button, Card, Col, Row } from "antd";
import ImageWithFallback from "./ImageWithFallback";

import { ReactComponent as PhoneIcon } from "../assets/images/restaurants-page/Phone (1).svg";
import { ReactComponent as PowerIcon } from "../assets/images/restaurants-page/Power (1).svg";

import { ReactComponent as CardUserIcon } from "../assets/images/restaurants-page/User (2).svg";
import { ReactComponent as CardAlertIcon } from "../assets/images/restaurants-page/Alert.svg";
import { ReactComponent as CardCreditCardIcon } from "../assets/images/restaurants-page/Credit Card (3).svg";
import { ReactComponent as CardImageIcon } from "../assets/images/restaurants-page/Image - 3.svg";
import { ReactComponent as CardNoteIcon } from "../assets/images/restaurants-page/Note - Text (3).svg";
import { ReactComponent as CardTicketIcon } from "../assets/images/restaurants-page/Ticket.svg";
import { ReactComponent as CardLeftArrowIcon } from "../assets/images/restaurants-page/Chevron - Left (1).svg";

const RestaurantProfile = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const [restaurantID, setRestaurantID] = useState(0);

    useEffect(() => {
        console.log("R> userPlace >>", userPlace);
        setRestaurantID(userPlace.replace(/\D/g, ""));
    }, []);

    useEffect(() => {
        if (restaurantID) {
            console.log("value::", restaurantID);
        }
    }, [restaurantID]);

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

    return (
        <Col span={24} className="table-section">
            <Card className="restaurant-profile">
                <Row className="top-section">
                    <div className="right-section">
                        <Row>
                            <div className="restaurant-image-container">
                                <ImageWithFallback
                                    imageUrl={"#"}
                                    className={"restaurant-image"}
                                    alt={"restaurant-image"}
                                />
                            </div>

                            <div className="restaurant-info-container">
                                <div className="restaurant-title">
                                    رستوران رفتاری
                                </div>

                                <div className="restaurant-info">
                                    <div className="restaurant-address">
                                        آدرس: {"سعادت آباد، علامه شمالی"}
                                    </div>
                                    <div className="restaurant-branch">
                                        شعبه: {"سعادت آباد"}
                                    </div>
                                    <div className="restaurant-phone">
                                        شماره تماس: {"091212345678"}
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
                        >
                            پروفایل فعال
                        </Button>

                        <Button
                            className="call-restaurant"
                            icon={<PhoneIcon />}
                        >
                            تماس با مجموعه
                        </Button>
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
    );
};

export default RestaurantProfile;
