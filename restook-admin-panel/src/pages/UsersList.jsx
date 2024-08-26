import React, { useContext, useEffect } from "react";

import {
    Button,
    Card,
    Col,
    Input,
    Table,
    DatePicker,
    Pagination,
    Select,
    Image,
    Spin,
    Row,
} from "antd";

import { ReactComponent as Arrow } from "../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as Calender } from "../assets/images/home-page/Calendar - Dates (1).svg";
import { ReactComponent as BackIcon } from "../assets/images/home-page/Arrow - Right.svg";
import { sortIcon } from "../utils/tableIconSort";
import { getTableData } from "../services/getTableData";
import useTableData from "../hooks/useTableData";
import ImageWithFallback from "../components/ImageWithFallback";
import PageWrapper from "../components/PageWrapper";
import { AuthContext } from "../store/AuthContextProvider";
import { UserContext } from "../store/UserContextProvider";

const UsersList = () => {
    const {
        pageFilter,
        tableData,
        totalPage,
        sortMode,
        sortTable,
        handleInputChange,
        setTableData,
        setTotalPage,
        handlePageChange,
        currentPage,
        backBtnHandler,
        setPageFilter,
    } = useTableData();

    const { userData } = useContext(AuthContext);
    const { userPlace, setUserPlace } = useContext(UserContext);

    const columns = [
        {
            title: "",
            dataIndex: "imageUrl",
            key: "imageUrl",
            width: "8.1%",
            render: (_, record, index) =>
                index !== 0 &&
                (record.imageUrl ? (
                    // <img
                    //     src={`${API_BASE_IMG}${record.imageUrl}`}
                    //     className="table-image"
                    //     onError={handleImageError}
                    // />
                    <ImageWithFallback
                        imageUrl={record.imageUrl}
                        className={"table-image"}
                        alt={"table-image"}
                    />
                ) : (
                    <div className="gray-circle"></div>
                )),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("fullName", sortMode)}
                    onClick={() => sortTable("fullName")}
                >
                    نام و نام خانوادگی
                </Button>
            ),
            dataIndex: "fullName",
            key: "fullName",
            width: "20%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) => {
                            handleInputChange(e, record.key, "fullName");
                            console.log(e.target.value);
                        }}
                    />
                ) : (
                    text
                ),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("jobTitle", sortMode)}
                    onClick={() => sortTable("jobTitle")}
                >
                    عنوان شغلی
                </Button>
            ),
            dataIndex: "jobTitle",
            key: "jobTitle",
            width: "17.67%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
                        // onChange={handleChange}
                        style={{ width: "80%" }}
                        options={[
                            { value: "همه", label: "همه" },
                            { value: "آشپز", label: "آشپز" },
                            { value: "هد آشپزخانه", label: "هد آشپزخانه" },
                            { value: "کباب زن", label: "کباب زن" },
                            { value: "باریستا", label: "باریستا" },
                            { value: "سالاد زن", label: "سالاد زن" },
                            { value: "بارتندر", label: "بارتندر" },
                        ]}
                    />
                ) : text ? (
                    text
                ) : (
                    "_"
                ),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("phoneNumber", sortMode)}
                    onClick={() => sortTable("phoneNumber")}
                >
                    شماره تماس
                </Button>
            ),
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "18%",
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
                <Button
                    type="text"
                    icon={sortIcon("createdAt", sortMode)}
                    onClick={() => sortTable("createdAt")}
                >
                    تاریخ ثبت‌نام
                </Button>
            ),
            dataIndex: "createdAt",
            key: "createdAt",
            width: "14%",
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
            title: (
                <Button
                    type="text"
                    icon={sortIcon("jobStatus", sortMode)}
                    onClick={() => sortTable("jobStatus")}
                >
                    وضعیت
                </Button>
            ),
            dataIndex: "jobStatus",
            key: "jobStatus",
            width: "14%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
                        // onChange={handleChange}
                        options={[
                            { value: "همه", label: "همه" },
                            { value: "نا معلوم", label: "نا معلوم" },
                            {
                                value: "به دنبال کار بهتر",
                                label: "به دنبال کار بهتر",
                            },
                            {
                                value: "آماده به کار",
                                label: "آماده به کار",
                            },
                            {
                                value: "مشغول به کار",
                                label: "مشغول به کار",
                            },
                        ]}
                    />
                ) : (
                    <div
                        className="status-tag"
                        style={{ background: text.backColor }}
                    >
                        <div
                            className="status-dot"
                            style={{ background: text.color }}
                        ></div>
                        {text.title}
                    </div>
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

    useEffect(() => {
        setPageFilter((prevState) => ({ ...prevState, status: "" }));
        console.log("RESET --------------------------------");
    }, []);

    useEffect(() => {
        const getData = async () => {
            const res = await getTableData(
                "users",
                pageFilter,
                currentPage,
                true
            );

            console.log("RESsSsSsSs >> ", res);

            setTableData(res[0]);
            setTotalPage(res[1]);
        };

        if (pageFilter.status === "") {
            getData();
        }
    }, [pageFilter, currentPage]);

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("users-list");
        }
    }, []);

    return (
        <>
            <PageWrapper>
                {userData.access_token.length ? (
                    <Row gutter={[24, 24]} className="content">
                        <Col span={24} className="table-section">
                            <Card title="لیست کارجوها">
                                <Table
                                    loading={!totalPage}
                                    dataSource={tableData}
                                    columns={columns}
                                    pagination={false}
                                    rowKey={(record) => record.id}
                                />
                                <Pagination
                                    // showLessItems={true}
                                    total={10 * totalPage}
                                    disabled={!totalPage}
                                    onChange={handlePageChange}
                                />
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <Spin size="large" className="loading-token-spinner" />
                )}
            </PageWrapper>
        </>
    );
};

export default UsersList;
