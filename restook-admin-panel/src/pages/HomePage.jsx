import React, { useContext, useEffect, useState } from "react";
import { CommonContext } from "../store/CommonContextProvider";
import { getRequest } from "../services/apiService";
import { AuthContext } from "../store/AuthContextProvider";

import {
    Button,
    Card,
    Col,
    Input,
    Row,
    Table,
    DatePicker,
    Pagination,
    Select,
    Image,
} from "antd";
import QuickAccess from "../components/QuickAccess";

import { ReactComponent as Arrow } from "../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as Swap } from "../assets/images/home-page/swap-icon.svg";
// import { ReactComponent as Up } from "../assets/images/home-page/up-arrow.svg";
// import { ReactComponent as Down } from "../assets/images/home-page/down-arrow.svg";
import { ReactComponent as Calender } from "../assets/images/home-page/Calendar - Dates (1).svg";
import { API_BASE_IMG, API_BASE_URL } from "../constants/apiConstants";

const HomePage = () => {
    const { localToken } = useContext(CommonContext);
    const { userData, setUserData } = useContext(AuthContext);

    const [page1Filter, setPage1Filter] = useState({
        sortBy: "jobTitle",
        sortOrder: "ASC",
        page: "1",
        search: "",
        date: "",
    });
    const [tableData, setTableData] = useState([{}]);
    const [totalPage, setTotalPage] = useState(0);

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

    const handleInputChange = (e, key, column) => {
        setPage1Filter((prevState) => ({
            ...prevState,
            [column]: e.target.value,
        }));
    };

    const columns = [
        {
            title: "",
            dataIndex: "imageUrl",
            key: "imageUrl",
            width: "10.1%",
            render: (_, record, index) =>
                index !== 0 &&
                (record.imageUrl ? (
                    <img
                        src={`${API_BASE_IMG}${record.imageUrl}`}
                        className="table-image"
                    />
                ) : (
                    // <Image
                    //     src={`${API_BASE_IMG}${record.imageUrl}`}
                    //     width={40}
                    // />
                    <div className="gray-circle"></div>
                )),
        },
        {
            title: (
                <Button type="text" icon={<Swap />}>
                    نام مجموعه
                </Button>
            ),
            dataIndex: "branch",
            key: "branch",
            width: "27%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) => {
                            handleInputChange(e, record.key, "branch");
                            console.log(e.target.value);
                        }}
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
            dataIndex: "jobTitle",
            key: "jobTitle",
            width: "19.67%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "jobTitle")
                        }
                    />
                ) : text ? (
                    text
                ) : (
                    "_"
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
            dataIndex: "createdAt",
            key: "createdAt",
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
                            جزئیات
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

    useEffect(() => {
        const getData = async () => {
            const res = await getRequest(
                `/advertisements?status=pending&sortBy=${page1Filter.sortBy}&sortOrder=${page1Filter.sortOrder}&page=${page1Filter.page}&search=${page1Filter.search}&date=${page1Filter.date}`
            );

            console.log("RESSSSS >>", res);

            setTotalPage(res.data.totalPages);

            const restaurants = res.data.advertisements;
            restaurants.unshift({});
            setTableData(restaurants);
        };

        getData();
    }, [page1Filter]);

    return (
        <Row gutter={[24, 24]} className="content">
            <QuickAccess />

            <Col span={24} className="table-section">
                <Card title="لیست آگهی جدید">
                    <Table
                        loading={!totalPage}
                        dataSource={tableData}
                        columns={columns}
                        pagination={false}
                    />
                    <Pagination
                        // showLessItems={true}
                        total={10 * totalPage}
                        disabled={!totalPage}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default HomePage;
