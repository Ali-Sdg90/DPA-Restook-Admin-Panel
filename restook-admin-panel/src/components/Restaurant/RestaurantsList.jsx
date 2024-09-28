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
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { ReactComponent as Arrow } from "../../assets/images/home-page/Chevron - Left.svg";
import { sortIcon } from "../../utils/tableIconSort";
import useTableData from "../../hooks/useTableData";
import { AuthContext } from "../../store/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserContextProvider";
import ImageWithFallback from "../Common/ImageWithFallback";
import { getRequest } from "../../services/apiService";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";

const RestaurantsList = () => {
    const {
        pageFilter,
        tableData,
        totalPage,
        sortMode,
        currentPage,
        selectedDate,
        isDateOpen,
        calendarRef,
        isLoading,
        dateValue,
        sortTable,
        handleInputChange,
        setTableData,
        setTotalPage,
        handlePageChange,
        setCurrentPage,
        setPageFilter,
        backBtnHandler,
        handleDateChange,
        handleOpenChange,
        setIsLoading,
    } = useTableData();

    const { userData } = useContext(AuthContext);
    const { userPlace, setUserPlace } = useContext(UserContext);

    const [searchObj, setSearchObj] = useState({
        // adminStatus: "ACTIVE",
        adminStatus: "",
        searchPhone: "",
        searchBranch: "",
        searchTitle: "",
        dateValue: dateValue,
    });

    const navigate = useNavigate();

    const detailsHandler = (id) => {
        setUserPlace(`restaurant-profile${id}`);
        navigate(`/restaurant-profile/${id}`);
    };

    useEffect(() => {
        setSearchObj((prevState) => ({
            ...prevState,
            [dateValue]: dateValue,
        }));
    }, [dateValue]);

    useEffect(() => {
        console.log("searchObj >>", searchObj);

        getData();
    }, [searchObj, pageFilter, currentPage]);

    const columns = [
        {
            title: "",
            dataIndex: "imageUrl",
            key: "imageUrl",
            width: "10.1%",
            render: (_, record, index) =>
                index !== 0 &&
                (record.imageUrl ? (
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
                        value={searchObj.searchTitle}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                searchTitle: convertFAtoEN(e.target.value),
                            }));
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
                        value={searchObj.searchBranch}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                searchBranch: convertFAtoEN(e.target.value),
                            }));
                        }}
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
            width: "19.08%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={searchObj.searchPhone}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                searchPhone: convertFAtoEN(e.target.value),
                            }));
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
                    icon={sortIcon("adminStatus", sortMode)}
                    onClick={() => sortTable("adminStatus")}
                >
                    وضعیت
                </Button>
            ),
            dataIndex: "adminStatusTitle",
            key: "adminStatusTitle",
            width: "14.15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
                        onChange={(value) =>
                            setSearchObj((prevState) => ({
                                ...prevState,
                                adminStatus: value,
                            }))
                        }
                        options={[
                            { value: "", label: "همه" },
                            { value: "ACTIVE", label: "فعال" },
                            { value: "INACTIVE", label: "غیر فعال" },
                            { value: "PENDING", label: "در حال بررسی" },
                            { value: "NOT_OFFICIAL", label: "غیر رسمی" },
                        ]}
                    />
                ) : (
                    <div
                        style={{
                            backgroundColor: record.adminStatusColor,
                        }}
                        className="activity-status-tag"
                    >
                        {text}
                    </div>
                ),
        },
        {
            title: "",
            dataIndex: "id",
            key: "details",
            render: (text, record, index) => {
                if (index !== 0) {
                    return (
                        <Button
                            type="text"
                            icon={<Arrow />}
                            iconPosition={"end"}
                            className="details-btn"
                            onClick={() => detailsHandler(text)}
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
    }, []);

    const getData = async () => {
        setIsLoading(true);

        try {
            if (pageFilter.status === "") {
                const res = await getRequest(
                    `/${"restaurants"}?adminStatus=${
                        searchObj.adminStatus
                    }&sortBy=${pageFilter.sortBy}&sortOrder=${
                        pageFilter.sortOrder
                    }&page=${currentPage}&searchPhone=${
                        searchObj.searchPhone
                    }&searchBranch=${searchObj.searchBranch}&searchTitle=${
                        searchObj.searchTitle
                    }&date=${dateValue === "1348/10/11" ? "" : dateValue}`
                );

                console.log("RESSSSS >>", res);

                if (res.success) {
                    const restaurants = res.data["restaurants"];
                    restaurants.unshift({ id: -1 });

                    setTableData(restaurants);
                    setTotalPage(res.data.totalPages ? res.data.totalPages : 1);
                } else {
                    console.log("ERROR IN FILTERING!");
                }
            }
        } catch (error) {
            console.error("Error in ExternalAdvertList-getData: ", error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("restaurants-list");
        }
    }, [userPlace]);

    const newRestaurantBtnClickHandler = () => {
        setUserPlace("create-new-restaurant");
    };

    return (
        <Row gutter={[24, 24]} className="content">
            <Col span={24} className="table-section">
                <Card title="لیست مجموعه‌ها">
                    <div className="new-restaurant-container">
                        <Button
                            type="primary"
                            className="new-restaurant-btn"
                            onClick={newRestaurantBtnClickHandler}
                        >
                            مجموعه جدید
                            <PlusOutlined />
                        </Button>
                    </div>

                    <Table
                        loading={isLoading}
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
                        current={currentPage}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default RestaurantsList;
