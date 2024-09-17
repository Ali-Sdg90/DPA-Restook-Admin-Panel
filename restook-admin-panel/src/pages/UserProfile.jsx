import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Card, Col, Spin, Row } from "antd";

import PageWrapper from "../components/Common/PageWrapper";
import { AuthContext } from "../store/AuthContextProvider";

import { ReactComponent as PhoneIcon } from "../assets/images/restaurants-page/Phone (1).svg";
import { ReactComponent as PowerIcon } from "../assets/images/restaurants-page/Power (1).svg";
import { ReactComponent as BriefcaseIcon } from "../assets/images/UserProfile/Briefcase.svg";
import { ReactComponent as EyeSlashIcon } from "../assets/images/UserProfile/Eye - Slash.svg";
import { ReactComponent as EyeIcon } from "../assets/images/UserProfile/Eye.svg";

import { getRequest, patchRequest } from "../services/apiService";
import ImageWithFallback from "../components/Common/ImageWithFallback";
import { CommonContext } from "../store/CommonContextProvider";
import {
    userBasicInfoEngOrder,
    userBasicInfoFaOrder,
    userMainInfoEngOrder,
    userMainInfoFaOrder,
} from "../constants/UserProfileConstants";

const UserProfile = () => {
    const [profileData, setProfileData] = useState();

    const { id } = useParams();

    const { userData } = useContext(AuthContext);
    const { setToastifyObj } = useContext(CommonContext);

    useEffect(() => {
        if (id) {
            console.log("id >>", id);

            const getData = async () => {
                const res = await getRequest(`/users/${id}`);

                console.log("User-res >>", res);

                if (res.success) {
                    setProfileData(res.data);
                } else {
                    console.log(`ERROR in /users/${id}`);
                }
            };

            getData();
        }
    }, [id]);

    const changeUserStatus = async (currentStatus) => {
        let newState = "ACTIVE";

        if (currentStatus === "ACTIVE") {
            newState = "INACTIVE";
        }

        const res = await patchRequest(
            `/users/${id}`,
            {
                adminStatus: newState,
            },
            true,
            setToastifyObj
        );

        if (res.success) {
            setProfileData((prevData) => ({
                ...prevData,
                adminStatus: newState,
            }));

            setToastifyObj(() => ({
                title: res.message,
                mode: "success",
            }));

            console.log("success-res >>", res);
        } else {
            console.error("ERROR IN PATCH");
        }
    };

    const mainInfoFiller = (mode, item) => {
        switch (mode) {
            case "workExperiences":
                return (
                    <div className="work-detail" key={item.id}>
                        <div className="bag-icon">
                            <BriefcaseIcon />
                        </div>

                        <div className="work-title">{item.jobTitle}</div>
                        <div className="work-place">{item.workplace}</div>
                        <div className="work-time">{item.dateFormat}</div>
                    </div>
                );

            case "educations":
                return (
                    <div className="work-detail" key={item.id}>
                        <div className="bag-icon">
                            <BriefcaseIcon />
                        </div>

                        <div className="work-title">{item.option.value}</div>
                        <div className="work-place">{item.field}</div>
                        <div className="work-time">{item.statusTitle}</div>
                    </div>
                );

            case "languages":
                return (
                    <div className="work-detail" key={item.id}>
                        <div className="bag-icon">
                            <BriefcaseIcon />
                        </div>

                        <div className="work-title">{item.language}</div>
                        <div className="work-place">{item.level}</div>
                    </div>
                );

            default:
                return "default";
        }
    };

    const changeVisibility = async (currentStatus) => {
        let newState = true;

        if (currentStatus === true) {
            newState = false;
        }

        const res = await patchRequest(
            `/users/${id}`,
            {
                jobStatusVisibil: newState,
            },
            true,
            setToastifyObj
        );

        if (res.success) {
            setProfileData((prevData) => ({
                ...prevData,
                jobStatusVisible: newState,
            }));

            setToastifyObj(() => ({
                title: res.message,
                mode: "success",
            }));

            console.log("success-res >>", res);
        } else {
            console.error("ERROR IN PATCH");
        }
    };

    return (
        <PageWrapper>
            {userData.access_token.length && profileData ? (
                <Row gutter={[24, 24]} className="content user-profile">
                    <Col span={24} className="table-section">
                        <Card className="first-card">
                            <div className="right-side">
                                <div className="user-image-container">
                                    <ImageWithFallback
                                        imageUrl={profileData.imageUrl}
                                        className={"profile-img"}
                                        alt={"profile-img"}
                                        needPrefix={true}
                                    />
                                </div>

                                <div className="user-info">
                                    <div className="user-name">
                                        {profileData.fullName}
                                    </div>
                                    <div className="user-type">
                                        {profileData.jobTitle}
                                    </div>
                                    <div className="user-tag-eye">
                                        {profileData.jobStatus ? (
                                            <div
                                                className="user-tag"
                                                style={{
                                                    background:
                                                        profileData.jobStatus
                                                            .backColor,
                                                }}
                                            >
                                                <div
                                                    className="tag-circle"
                                                    style={{
                                                        background:
                                                            profileData
                                                                .jobStatus
                                                                .color,
                                                    }}
                                                ></div>
                                                <div className="tag-text">
                                                    {
                                                        profileData.jobStatus
                                                            .title
                                                    }
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}

                                        <div
                                            className="eye-icon"
                                            onClick={() =>
                                                changeVisibility(
                                                    profileData.jobStatusVisible
                                                )
                                            }
                                        >
                                            {profileData.jobStatusVisible ? (
                                                <EyeIcon />
                                            ) : (
                                                <EyeSlashIcon />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="left-side">
                                <Button
                                    className="active-profile-btn"
                                    type="primary"
                                    icon={<PowerIcon />}
                                    style={{
                                        background:
                                            profileData.adminStatus === "ACTIVE"
                                                ? "#2EB85C"
                                                : "#E45353",
                                    }}
                                    onClick={() =>
                                        changeUserStatus(
                                            profileData.adminStatus
                                        )
                                    }
                                >
                                    {profileData.adminStatus === "ACTIVE"
                                        ? "پروفایل فعال"
                                        : "پروفایل غیرفعال"}
                                </Button>

                                {profileData.phoneNumber ? (
                                    <a href={`tel:${profileData.phoneNumber}`}>
                                        <Button
                                            className="call-restaurant"
                                            icon={<PhoneIcon />}
                                        >
                                            تماس با کارجو
                                        </Button>
                                    </a>
                                ) : (
                                    ""
                                )}
                            </div>
                        </Card>

                        <div className="second-card">
                            <Card
                                className="second-right-card"
                                title={"اطلاعات هویتی"}
                            >
                                <div className="basic-info-section">
                                    {profileData.userInformation ? (
                                        <>
                                            {userBasicInfoFaOrder.map(
                                                (title, index) => (
                                                    <div
                                                        className="basic-info-row"
                                                        key={index}
                                                    >
                                                        <div className="basic-info-title">
                                                            {title}
                                                        </div>
                                                        <div className="basic-info-value">
                                                            {userBasicInfoEngOrder[
                                                                index
                                                            ] ===
                                                                "originCity" ||
                                                            userBasicInfoEngOrder[
                                                                index
                                                            ] === "city"
                                                                ? profileData
                                                                      .userInformation[
                                                                      userBasicInfoEngOrder[
                                                                          index
                                                                      ]
                                                                  ]
                                                                    ? profileData
                                                                          .userInformation[
                                                                          userBasicInfoEngOrder[
                                                                              index
                                                                          ]
                                                                      ].city
                                                                    : ""
                                                                : profileData
                                                                      .userInformation[
                                                                      userBasicInfoEngOrder[
                                                                          index
                                                                      ]
                                                                  ]}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </Card>

                            <Card
                                className="second-left-card"
                                title={"درباره‌ی من"}
                            >
                                <div className="about-context">
                                    {profileData.aboutMe
                                        ? profileData.aboutMe
                                        : "ثبت نشده"}
                                </div>
                            </Card>
                        </div>

                        {userMainInfoFaOrder.map((title, index) => (
                            <Card
                                className="third-card"
                                title={title}
                                key={index}
                            >
                                <div className="work-details-section">
                                    {profileData[
                                        userMainInfoEngOrder[index]
                                    ].map((item) =>
                                        mainInfoFiller(
                                            userMainInfoEngOrder[index],
                                            item
                                        )
                                    )}
                                </div>
                            </Card>
                        ))}
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default UserProfile;
