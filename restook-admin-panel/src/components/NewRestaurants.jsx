import React, { useEffect } from "react";

import { Button, Card, Col, Input, Table, DatePicker, Pagination } from "antd";

import { ReactComponent as Arrow } from "../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as Calender } from "../assets/images/home-page/Calendar - Dates (1).svg";
import { API_BASE_IMG } from "../constants/apiConstants";
import { sortIcon } from "../utils/tableIconSort";
import { getTableData } from "../services/getTableData";
import useTableData from "../hooks/useTableData";
import { handleImageError } from "../utils/imageFallback";

const NewRestaurants = () => {
    const {
        pageFilter,
        tableData,
        totalPage,
        sortMode,
        sortTable,
        handleInputChange,
        setTableData,
        setTotalPage,
        currentPage,
    } = useTableData();

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
                        onError={handleImageError}
                    />
                ) : (
                    <div className="gray-circle"></div>
                )),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("jobTitle", sortMode)}
                    onClick={() => sortTable("jobTitle")}
                >
                    نام مجموعه
                </Button>
            ),
            dataIndex: "jobTitle",
            key: "jobTitle",
            width: "27%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) => {
                            handleInputChange(e, record.key, "jobTitle");
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
                    icon={sortIcon("branch", sortMode)}
                    onClick={() => sortTable("branch")}
                >
                    شعبه
                </Button>
            ),
            dataIndex: "branch",
            key: "branch",
            width: "19.67%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "branch")
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
                <Button
                    type="text"
                    icon={sortIcon("createdAt", sortMode)}
                    onClick={() => sortTable("createdAt")}
                >
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

    useEffect(() => {
        const getData = async () => {
            const res = await getTableData(
                "restaurants",
                pageFilter,
                currentPage,
                false
            );

            setTableData(res[0]);
            setTotalPage(res[1]);
        };

        getData();
    }, [pageFilter, currentPage]);

    return (
        <>
            <Col span={24} className="table-section">
                <Card title="لیست مجموعه‌های جدید">
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
                    />
                </Card>
            </Col>
        </>
    );
};

export default NewRestaurants;