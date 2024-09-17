import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Card, Col, Spin, Row } from "antd";

import PageWrapper from "../components/Common/PageWrapper";
import { UserContext } from "../store/UserContextProvider";
import { AuthContext } from "../store/AuthContextProvider";

import { ReactComponent as PhoneIcon } from "../assets/images/restaurants-page/Phone (1).svg";
import { ReactComponent as PowerIcon } from "../assets/images/restaurants-page/Power (1).svg";
import { ReactComponent as Briefcase } from "../assets/images/UserProfile/Briefcase.svg";
import { ReactComponent as Eye } from "../assets/images/UserProfile/Eye - Slash.svg";

import { getRequest } from "../services/apiService";
import ImageWithFallback from "../components/Common/ImageWithFallback";

const userBasicInfoEngOrder = [
    "birthYear",
    "originCity",
    "city",
    "genderTitle",
    "nationTitle",
    "marriageStatusTitle",
    "dutyStatusTitle",
];

const userBasicInfoFaOrder = [
    "سال تولد",
    "محل تولد",
    "محل سکونت",
    "جنسیت",
    "ملیت",
    "وضعیت تأهل",
    "وضعیت نظام وظیفه",
];

const userMainInfoEngOrder = ["workExperiences", "educations", "languages"];

const userMainInfoFaOrder = [
    "سوابق کاری",
    // "جوایز و مدارک",
    "تحصیلات دانشگاهی",
    "زبان‌های خارجی",
];

const UserProfile = () => {
    const [profileData, setProfileData] = useState();

    const { id } = useParams();

    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

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

    // const changeRestaurantStatus = async (currentStatus) => {
    //     let newState = "ACTIVE";

    //     if (currentStatus === "ACTIVE") {
    //         newState = "INACTIVE";
    //     }

    //     const res = await patchRequest(
    //         `/restaurants/${id}`,
    //         {
    //             adminStatus: newState,
    //         },
    //         true,
    //         setToastifyObj
    //     );

    //     if (res.success) {
    //         setRestaurantData((prevData) => ({
    //             ...prevData,
    //             adminStatus: newState,
    //         }));
    //     } else {
    //         console.error("ERROR IN PATCH");
    //     }
    // };

    const mainInfoFiller = (mode, item, index) => {
        // console.log("item >>", item);
        // console.log("mode >>", mode);

        switch (mode) {
            case "workExperiences":
                return (
                    <div className="work-detail" key={index}>
                        <div className="bag-icon">
                            <Briefcase />
                        </div>

                        <div className="work-title">{item.jobTitle}</div>
                        <div className="work-place">{item.workplace}</div>
                        <div className="work-time">{item.dateFormat}</div>
                    </div>
                );

            case "educations":
                return (
                    <div className="work-detail" key={index}>
                        <div className="bag-icon">
                            <Briefcase />
                        </div>

                        <div className="work-title">{item.option.value}</div>
                        <div className="work-place">{item.field}</div>
                        <div className="work-time">{item.statusTitle}</div>
                    </div>
                );

            case "languages":
                return (
                    <div className="work-detail" key={index}>
                        <div className="bag-icon">
                            <Briefcase />
                        </div>

                        <div className="work-title">{item.language}</div>
                        <div className="work-place">{item.level}</div>
                    </div>
                );

            default:
                return "default";
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

                                        <div className="eye-icon">
                                            <Eye />
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
                                    // onClick={() =>
                                    //     changeRestaurantStatus(
                                    //         profileData.adminStatus
                                    //     )
                                    // }
                                >
                                    {profileData.adminStatus === "ACTIVE"
                                        ? "پروفایل فعال"
                                        : "پروفایل غیرفعال"}
                                </Button>

                                <a href={`tel:${profileData.phoneNumber}`}>
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
                                    {profileData.userInformation ? (
                                        <>
                                            {userBasicInfoFaOrder.map(
                                                (title, index) => (
                                                    <div className="basic-info-row">
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
                                            item,
                                            index
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
