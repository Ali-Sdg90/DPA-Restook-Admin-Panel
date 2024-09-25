import React, { useContext, useEffect, useState } from "react";

import {
    Button,
    Card,
    Col,
    Input,
    Table,
    Pagination,
    Select,
    Spin,
    Row,
} from "antd";

import { ReactComponent as Arrow } from "../../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import { ReactComponent as Balloon } from "../../assets/images/restaurants-page/Balloon.svg";
import { ReactComponent as Fire } from "../../assets/images/restaurants-page/Fire.svg";
import { ReactComponent as Plus } from "../../assets/images/restaurants-page/Plus.svg";

import { PlusOutlined } from "@ant-design/icons";

import { sortIcon } from "../../utils/tableIconSort";
import useTableData from "../../hooks/useTableData";
import { AuthContext } from "../../store/AuthContextProvider";
import { UserContext } from "../../store/UserContextProvider";
import PageWrapper from "../../components/Common/PageWrapper";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useParams } from "react-router-dom";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";
import { getRequest } from "../../services/apiService";

const RestaurantAdvertList = () => {
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
        setIsLoading,
        sortTable,
        setTableData,
        setTotalPage,
        handlePageChange,
        setPageFilter,
        handleDateChange,
        handleOpenChange,
    } = useTableData();

    const { userData } = useContext(AuthContext);
    const { setUserPlace } = useContext(UserContext);

    const { id } = useParams();

    const [searchObj, setSearchObj] = useState({
        status: "",
        searchPhone: "",
        searchAdTitle: "",
        searchResTitle: "",
        restaurantId: "",
        dateValue: dateValue,
    });

    const detailsBtnClickHandler = (advertId) => {
        setUserPlace(`restaurant-advert-info-${advertId}`);
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
            width: "3.1%",
            render: (_, record, index) => <div></div>,
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
            width: "20%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={searchObj.searchAdTitle}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                searchAdTitle: convertFAtoEN(e.target.value),
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
                    icon={sortIcon("createdAt", sortMode)}
                    onClick={() => sortTable("createdAt")}
                >
                    تاریخ ثبت
                </Button>
            ),
            dataIndex: "date",
            key: "date",
            width: "15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <InputDatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="jYYYY-jMM-jDD"
                        open={isDateOpen}
                        onOpenChange={handleOpenChange}
                        ref={calendarRef}
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
                    icon={sortIcon("status", sortMode)}
                    onClick={() => sortTable("status")}
                >
                    وضعیت
                </Button>
            ),
            dataIndex: "status",
            key: "status",
            width: "15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
                        style={{ width: "80%" }}
                        onChange={(value) =>
                            setSearchObj((prevState) => ({
                                ...prevState,
                                status: value,
                            }))
                        }
                        options={[
                            { value: "", label: "همه" },
                            { value: "published", label: "منتشر شده" },
                            { value: "closed", label: "بسته شده" },
                            { value: "draft", label: "پیش نویس" },
                            { value: "expired", label: "منقضی شده" },
                            { value: "pending", label: "در انتظار تایید" },
                            { value: "holdOn", label: "ایست شده" },
                        ]}
                    />
                ) : record.status ? (
                    <div
                        className="status-tag"
                        style={{ background: record.status.backColor }}
                    >
                        <div
                            className="status-dot"
                            style={{ background: record.status.color }}
                        ></div>
                        {record.status.title}
                    </div>
                ) : (
                    ""
                ),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("resumeCounter", sortMode)}
                    onClick={() => sortTable("resumeCounter")}
                >
                    رزومه دریافتی
                </Button>
            ),
            dataIndex: "resumeCounter",
            key: "resumeCounter",
            width: "15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={searchObj.searchAdTitle}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                TEMP: convertFAtoEN(e.target.value),
                            }));
                        }}
                    />
                ) : (
                    <div className="center-menu-item">{text}</div>
                ),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("viewCounter", sortMode)}
                    onClick={() => sortTable("viewCounter")}
                >
                    تعداد بازدید
                </Button>
            ),
            dataIndex: "viewCounter",
            key: "viewCounter",
            width: "15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={searchObj.searchAdTitle}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                TEMP: convertFAtoEN(e.target.value),
                            }));
                        }}
                    />
                ) : (
                    <div className="center-menu-item">{text}</div>
                ),
        },
        {
            title: "",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "7%",
            render: (_, record, index) => {
                if (index !== 0) {
                    return (
                        <div className="center-menu-item">
                            {record.immediateRecruitment && <Fire />}
                            {record.immediateRecruitment & record.balloon ? (
                                <Plus />
                            ) : (
                                ""
                            )}
                            {record.balloon && <Balloon />}
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
                            onClick={() => detailsBtnClickHandler(record.id)}
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
                    `/${"advertisements"}?status=${searchObj.status}&sortBy=${
                        pageFilter.sortBy
                    }&sortOrder=${
                        pageFilter.sortOrder
                    }&page=${currentPage}&searchPhone=${
                        searchObj.searchPhone
                    }&searchAdTitle=${searchObj.searchAdTitle}&searchResTitle=${
                        searchObj.searchResTitle
                    }&restaurantId=${id}&date=${
                        dateValue === "1348/10/11" ? "" : dateValue
                    }`
                );

                console.log("RESSSSS >>", res);

                if (res.success) {
                    const restaurants = res.data["advertisements"];
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

    const backBtnHandler = () => {
        setUserPlace(`restaurant-profile-${id}`);
    };

    const newRestaurantAdvertBtn = () => {
        setUserPlace(`new-restaurant-advert-${id}`);
    };

    return (
        <PageWrapper>
            {userData.access_token.length ? (
                <Row gutter={[24, 24]} className="content">
                    <Col span={24} className="table-section">
                        <Card
                            title={
                                <>
                                    <span
                                        onClick={backBtnHandler}
                                        className="back-arrow-btn"
                                    >
                                        <BackIcon />
                                    </span>
                                    <span>لیست آگهی‌ها</span>
                                </>
                            }
                        >
                            <div className="new-restaurant-container">
                                <Button
                                    type="primary"
                                    className="new-restaurant-btn"
                                    onClick={newRestaurantAdvertBtn}
                                >
                                    آگهی جدید
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
                            />
                        </Card>
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default RestaurantAdvertList;
