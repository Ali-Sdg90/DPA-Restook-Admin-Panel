import React, { useContext, useEffect, useState } from "react";

import {
    Button,
    Card,
    Col,
    Input,
    Table,
    Pagination,
    Select,
    Row,
    Spin,
    DatePicker,
} from "antd";

import { ReactComponent as Calender } from "../assets/images/home-page/Calendar - Dates (1).svg";
import { ReactComponent as Arrow } from "../assets/images/home-page/Chevron - Left.svg";
import { sortIcon } from "../utils/tableIconSort";
import { getTableData } from "../services/getTableData";
import useTableData from "../hooks/useTableData";
import { UserContext } from "../store/UserContextProvider";
import ImageWithFallback from "./ImageWithFallback";

const ExternalAdvertList = () => {
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
        setPageFilter,
    } = useTableData();

    const { userPlace, setUserPlace } = useContext(UserContext);

    const detailsHandler = (id) => {
        console.log("id >>", id);
        setUserPlace(`external-advert-profile-${id}`);
    };

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
                        needPrefix={false}
                    />
                ) : (
                    <div className="gray-circle"></div>
                )),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("restaurantTitle", sortMode)}
                    onClick={() => sortTable("restaurantTitle")}
                >
                    نام مجموعه
                </Button>
            ),
            dataIndex: "restaurantTitle",
            key: "restaurantTitle",
            width: "24%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) => {
                            handleInputChange(e, record.key, "restaurantTitle");
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
                    عنوان آگهی
                </Button>
            ),
            dataIndex: "jobTitle",
            key: "jobTitle",
            width: "15%",
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
                    icon={sortIcon("date", sortMode)}
                    onClick={() => sortTable("date")}
                >
                    تاریخ ثبت
                </Button>
            ),
            dataIndex: "date",
            key: "date",
            width: "12%",
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
                    icon={sortIcon("statusTitle", sortMode)}
                    onClick={() => sortTable("statusTitle")}
                >
                    وضعیت رستوران
                </Button>
            ),
            dataIndex: "statusTitle",
            key: "statusTitle",
            width: "14%",
            render: (text, record, index) => {
                if (index === 0) {
                    return (
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
                    );
                } else {
                    return (
                        <div
                            className="status-tag"
                            style={{ background: record.statusBackColor }}
                        >
                            <div
                                className="status-dot"
                                style={{ background: record.statusColor }}
                            ></div>
                            {record.statusTitle}
                        </div>
                    );
                }
            },
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
                            onClick={() => detailsHandler(record.id)}
                        >
                            جزئیات
                        </Button>
                    );
                }
            },
        },
    ];

    useEffect(() => {
        setPageFilter((prevState) => ({
            ...prevState,
            status: "",
            sortBy: "", // temp until its API write
        }));
        console.log("RESET --------------------------------");
    }, []);

    useEffect(() => {
        const getData = async () => {
            const res = await getTableData(
                "temp/tempAds",
                pageFilter,
                currentPage,
                true,
                "advertisements"
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
            setUserPlace("external-advert-list");
        }
    }, []);

    return (
        <Row gutter={[24, 24]} className="content">
            <Col span={24} className="table-section">
                <Card title="لیست آگهی‌ها">
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
    );
};

export default ExternalAdvertList;
