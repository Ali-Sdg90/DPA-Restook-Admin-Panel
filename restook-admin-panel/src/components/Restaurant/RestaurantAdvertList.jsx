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
import { getTableData, getTableData2 } from "../../services/getTableData";
import useTableData from "../../hooks/useTableData";
import { AuthContext } from "../../store/AuthContextProvider";
import { UserContext } from "../../store/UserContextProvider";
import PageWrapper from "../../components/Common/PageWrapper";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useParams } from "react-router-dom";

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
        sortTable,
        handleInputChange,
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
                    icon={sortIcon("date", sortMode)}
                    onClick={() => sortTable("date")}
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
                    icon={sortIcon("resumeCounter", sortMode)}
                    onClick={() => sortTable("resumeCounter")}
                >
                    وضعیت
                </Button>
            ),
            dataIndex: "resumeCounter",
            key: "resumeCounter",
            width: "15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
                        style={{ width: "80%" }}
                        options={[
                            { value: "همه", label: "همه" },
                            {
                                value: "در انتظار تایید",
                                label: "در انتظار تایید",
                            },
                            {
                                value: "تایید شده",
                                label: "تایید شده",
                            },
                            {
                                value: "منتشر شده",
                                label: "منتشر شده",
                            },
                            {
                                value: "others",
                                label: "others",
                            },
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
                        value={record.address}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "resumeCounter")
                        }
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
                        value={record.address}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "viewCounter")
                        }
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
    }, []); // temp

    useEffect(() => {
        const getData = async () => {
            const res = await getTableData2(
                `/advertisements?page=1&restaurantId=${id}`,
                "advertisements"
            ); // temp

            console.log("RESsSsSsSs >> ", res);

            setTableData(res[0]);
            setTotalPage(res[1] ? res[1] : 1);
        };

        if (pageFilter.status === "") {
            getData();
        }
    }, [pageFilter, currentPage]);

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
    );
};

export default RestaurantAdvertList;
