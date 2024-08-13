import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../store/CommonContextProvider";
import { getRequest } from "../services/apiService";
import { AuthContext } from "../store/AuthContextProvider";

import { Button, Card, Col, Input, Row, Table, DatePicker } from "antd";
import QuickAccess from "../components/QuickAccess";

import { ReactComponent as Arrow } from "../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as Swap } from "../assets/images/home-page/swap-icon.svg";
// import { ReactComponent as Up } from "../assets/images/home-page/up-arrow.svg";
// import { ReactComponent as Down } from "../assets/images/home-page/down-arrow.svg";
import { ReactComponent as Calender } from "../assets/images/home-page/Calendar - Dates (1).svg";

const HomePage = () => {
    const { localToken } = useContext(CommonContext);
    const { userData, setUserData } = useContext(AuthContext);

    useEffect(() => {
        const getProfile = async () => {
            if (localToken) {
                const res = await getRequest("/auth/profile");

                console.log("res >>", res);

                setUserData({
                    access_token: localToken,
                    user: res,
                });
            }
        };

        if (!userData.access_token.length) {
            getProfile();
        } else {
            console.log("NO NEED FOR getProfile()", userData);
        }
    }, [localToken, setUserData, userData]);

    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([
        {
            name: "",
            title: "",
            phoneNumber: "",
            date: "",
        },
    ]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleInputChange = (e, key, column) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, [column]: e.target.value });
            setData(newData);
        }
    };

    const columns = [
        {
            title: "",
            dataIndex: "profile-img",
            key: "profileImg",
            width: "10.1%",
            render: (_, record, index) => index !== 0 && record.profileImg,
        },
        {
            title: (
                <Button type="text" icon={<Swap />}>
                    نام مجموعه
                </Button>
            ),
            dataIndex: "name",
            key: "name",
            width: "27%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "name")
                        }
                    />
                ) : (
                    text
                ),
        },
        {
            title: (
                <Button type="text" icon={<Swap />}>
                    عنوان آگهی
                </Button>
            ),
            dataIndex: "title",
            key: "title",
            width: "19.67%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "title")
                        }
                    />
                ) : (
                    text
                ),
        },
        {
            title: (
                <Button type="text" icon={<Swap />}>
                    شماره تماس
                </Button>
            ),
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "21.08%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "phoneNumber")
                        }
                    />
                ) : (
                    text
                ),
        },
        {
            title: (
                <Button type="text" icon={<Swap />}>
                    تاریخ ثبت
                </Button>
            ),
            dataIndex: "date",
            key: "date",
            width: "14.15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <DatePicker
                        placeholder="انتخاب تاریخ"
                        suffixIcon={<Calender />}
                    />
                ) : (
                    text
                ),
        },
        {
            title: "",
            dataIndex: "details",
            key: "details",
            render: (_, record, index) => {
                if (index !== 0) {
                    return (
                        <Button
                            type="text"
                            icon={<Arrow />}
                            iconPosition={"end"}
                            className="details-btn"
                        >
                            {record.details}
                        </Button>
                    );
                }
            },
        },
    ];

    // Temp
    const dataSource = Array(10)
        .fill(0)
        .map((_, index) => {
            if (index % 2) {
                return {
                    key: index,
                    profileImg: <div className="gray-circle"></div>,
                    name: "چلوگباب رفتاری (شعبه سعادت آباد)",
                    title: "آشپز",
                    phoneNumber: "09120148529",
                    date: "1402/09/09",
                    details: "جزئیات",
                };
            } else {
                return {
                    key: index,
                    profileImg: <div className="gray-circle"></div>,
                    name: "رستوران البرز",
                    title: "سالن کار",
                    phoneNumber: "09120148529",
                    date: "1402/09/09",
                    details: "جزئیات",
                };
            }
        });

    return (
        <Row gutter={[24, 24]} className="content">
            <QuickAccess />

            <Col span={24} className="table-section">
                <Card title="لیست آگهی جدید">
                    <Table
                        loading={isLoading}
                        dataSource={!isLoading && dataSource}
                        columns={!isLoading && columns}
                        pagination={{
                            defaultCurrent: 1,
                            total: 50,
                            showLessItems: true,
                        }}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default HomePage;
