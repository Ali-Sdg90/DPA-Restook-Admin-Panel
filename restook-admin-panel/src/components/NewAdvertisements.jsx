import React, { useEffect, useState } from "react";
import { getRequest } from "../services/apiService";

import { Button, Card, Col, Input, Table, DatePicker, Pagination } from "antd";
import QuickAccess from "../components/QuickAccess";

import { ReactComponent as Arrow } from "../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as Calender } from "../assets/images/home-page/Calendar - Dates (1).svg";
import { API_BASE_IMG } from "../constants/apiConstants";
import { sortIcon } from "../utils/tableIconSort";

const NewAdvertisements = () => {
    const [pageFilter, setPageFilter] = useState({
        sortBy: "jobTitle",
        sortOrder: "ASC",
        page: "1",
        search: "",
        date: "",
    });
    const [tableData, setTableData] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [sortMode, setSortMode] = useState({
        mode: "",
        isASC: false,
    });

    const sortTable = (mode) => {
        let sortOrder = "ASC";

        setSortMode((prevState) => {
            if (prevState.mode === mode) {
                if (prevState.isASC) {
                    sortOrder = "DESC";
                } else {
                    sortOrder = "ASC";
                }

                return {
                    mode: mode,
                    isASC: !prevState.isASC,
                };
            } else {
                return {
                    mode: mode,
                    isASC: true,
                };
            }
        });

        setPageFilter((prevState) => ({
            ...prevState,
            sortBy: mode,
            sortOrder: sortOrder,
        }));
    };

    const handleInputChange = (e, key, column) => {
        setPageFilter((prevState) => ({
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
            width: "27%",
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
                            جزئیات
                        </Button>
                    );
                }
            },
        },
    ];

    useEffect(() => {
        const getData = async () => {
            const res = await getRequest(
                `/advertisements?status=pending&sortBy=${pageFilter.sortBy}&sortOrder=${pageFilter.sortOrder}&page=${pageFilter.page}&search=${pageFilter.search}&date=${pageFilter.date}`
            );

            console.log("RESSSSS >>", res);

            if (res.success) {
                console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
                setTotalPage(res.data.totalPages);

                const restaurants = res.data.advertisements;
                restaurants.unshift({});
                setTableData(restaurants);
            } else {
                console.log("ERROR IN FILTERING!!!!!", pageFilter);
            }
        };

        getData();
    }, [pageFilter]);

    return (
        <>
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
        </>
    );
};

export default NewAdvertisements;
