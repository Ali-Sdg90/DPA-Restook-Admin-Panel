import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
    Button,
    Card,
    Col,
    Spin,
    Row,
} from "antd";

import PageWrapper from "../components/Common/PageWrapper";
import { UserContext } from "../store/UserContextProvider";
import { AuthContext } from "../store/AuthContextProvider";

import { ReactComponent as PhoneIcon } from "../assets/images/restaurants-page/Phone (1).svg";
import { ReactComponent as PowerIcon } from "../assets/images/restaurants-page/Power (1).svg";

const UserProfile = () => {
    const { id } = useParams();

    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    useEffect(() => {
        console.log("ID >>", id);
    });

    return (
        <PageWrapper>
            {userData.access_token.length ? (
                <Row gutter={[24, 24]} className="content user-profile">
                    <Col span={24} className="table-section">
                        <Card className="first-card">
                            <div className="right-side">
                                <div className="user-image-container"></div>

                                <div className="user-info">
                                    <div className="user-name">
                                        محمد امین دولت آبادی
                                    </div>
                                    <div className="user-type">آشپز</div>
                                    <div className="user-tag-eye">
                                        <div className="user-tag">
                                            <div className="tag-circle"></div>
                                            <div className="tag-text">
                                                به دنبال کار بهتر
                                            </div>
                                        </div>

                                        <div className="eye-icon"></div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="left-side">
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

                                <a href={`tel:${restaurantData.phoneNumber}`}>
                                    <Button
                                        className="call-restaurant"
                                        icon={<PhoneIcon />}
                                    >
                                        تماس با مجموعه
                                    </Button>
                                </a>
                            </div> */}

                            <div className="left-side">
                                <Button
                                    className="active-profile-btn"
                                    type="primary"
                                    icon={<PowerIcon />}
                                    style={{
                                        background: "#2EB85C",
                                    }}
                                >
                                    پروفایل فعال
                                </Button>

                                <a>
                                    <Button
                                        className="call-restaurant"
                                        icon={<PhoneIcon />}
                                    >
                                        تماس با مجموعه
                                    </Button>
                                </a>
                            </div>
                        </Card>

                        <div className="second-card">
                            <Card
                                className="second-right-card"
                                title={"اطلاعات هویتی"}
                            >
                                <div className="basic-info-section">
                                    <div className="basic-info-row">
                                        <div className="basic-info-title">
                                            سال تولد
                                        </div>
                                        <div className="basic-info-value">
                                            1375
                                        </div>
                                    </div>

                                    <div className="basic-info-row">
                                        <div className="basic-info-title">
                                            سال تولد
                                        </div>
                                        <div className="basic-info-value">
                                            1375
                                        </div>
                                    </div>

                                    <div className="basic-info-row">
                                        <div className="basic-info-title">
                                            سال تولد
                                        </div>
                                        <div className="basic-info-value">
                                            1375
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card
                                className="second-left-card"
                                title={"درباره‌ی من"}
                            >
                                <div className="about-context">
                                    لورم ایپسوم متن ساختگی با تولید سادگی
                                    نامفهوم از صنعت چاپ و با استفاده از طراحان
                                    گرافیک است. چاپگرها و متون بلکه روزنامه و
                                    مجله در ستون و سطرآنچنان که لازم است و برای
                                    شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
                                    متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                                    لورم ایپسوم متن ساختگی با تولید سادگی
                                    نامفهوم از صنعت چاپ و با استفاده از طراحان
                                    گرافیک است.
                                </div>
                            </Card>
                        </div>

                        <Card className="third-card" title="سوابق کاری">
                            <div className="work-details-section">
                                <div className="work-detail">
                                    <div className="bag-icon"></div>
                                    <div className="work-title">آشپز</div>
                                    <div className="work-place">
                                        رستوران رفتاری
                                    </div>
                                    <div className="work-time">
                                        از دی ماه 1398 تا اکنون
                                    </div>
                                </div>

                                <div className="work-detail">
                                    <div className="bag-icon"></div>
                                    <div className="work-title">آشپز</div>
                                    <div className="work-place">
                                        رستوران رفتاری
                                    </div>
                                    <div className="work-time">
                                        از دی ماه 1398 تا اکنون
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default UserProfile;
