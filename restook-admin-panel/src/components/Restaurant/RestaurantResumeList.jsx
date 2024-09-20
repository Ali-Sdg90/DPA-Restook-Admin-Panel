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

import { ReactComponent as Arrow } from "../../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import { sortIcon } from "../../utils/tableIconSort";
import { getTableData } from "../../services/getTableData";
import useTableData from "../../hooks/useTableData";
import ImageWithFallback from "../Common/ImageWithFallback";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../store/UserContextProvider";
import PageWrapper from "../Common/PageWrapper";
import { AuthContext } from "../../store/AuthContextProvider";
import { getRequest } from "../../services/apiService";

const RestaurantResumeList = () => {
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
        handleDateChange,
        handleOpenChange,
    } = useTableData();

    const { userData } = useContext(AuthContext);
    const { userPlace, setUserPlace } = useContext(UserContext);

    const [advertId, setAdvertId] = useState();

    const { id: restaurantID } = useParams();

    const navigate = useNavigate();

    const detailBtnClickHandler = (resumeID) => {
        console.log("resumeID >>", resumeID);

        setUserPlace(`user-profile-${resumeID}`);
        navigate(
            `/resume-user-profile/${advertId}/${restaurantID}/${resumeID}`
        );
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
                    <ImageWithFallback
                        imageUrl={record.imageUrl}
                        className={"table-image"}
                        alt={"table-image"}
                        needPrefix={true}
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
                    تاریخ ارسال
                </Button>
            ),
            dataIndex: "createdAt",
            key: "createdAt",
            width: "14%",
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
                ) : (
                    text
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
            dataIndex: "jobStatus",
            key: "jobStatus",
            width: "14%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
                        // onChange={handleChange}
                        options={[
                            { value: "", label: "همه" },
                            { value: "1", label: "?" },
                            { value: "2", label: "?" },
                            { value: "3", label: "رد شده" },
                            { value: "4", label: "?" },
                            { value: "5", label: "تایید شده" },
                            { value: "6", label: "زمان مصاحبه" },
                            { value: "7", label: "?" },
                        ]}
                    />
                ) : (
                    <>
                        {record.status ? (
                            <div
                                className="status-tag"
                                style={{
                                    background: `#${record.status.statusBackColor}`,
                                }}
                            >
                                <div
                                    className="status-dot"
                                    style={{
                                        background: `#${record.status.statusColor}`,
                                    }}
                                ></div>
                                {record.status.title}
                            </div>
                        ) : (
                            ""
                        )}
                    </>
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
                            onClick={() => detailBtnClickHandler(record.userId)}
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
                `/${"sent-resumes"}?sortBy=${pageFilter.sortBy}&sortOrder=${
                    pageFilter.sortOrder
                }&status=${""}&page=${currentPage}&search=${""}&jobTitleId=${""}&advertisementId=${advertId}&date=${""}`
            );

            console.log("RESSSSS >>", res);

            if (res.success) {
                const restaurants = res.data["sentResumes"];
                restaurants.unshift({ id: -1 });

                setTableData(restaurants);
                setTotalPage(res.data.totalPages || 1);
            } else {
                console.log("ERROR IN FILTERING!", res);
            }
        };

        if (advertId) {
            getData();
        }
    }, [pageFilter, currentPage, advertId]);

    useEffect(() => {
        setAdvertId(userPlace.match(/\d+/g));
    }, []);

    const backBtnHandler = () => {
        setUserPlace(`restaurant-advert-info-${advertId}`);
    };

    return (
        <PageWrapper>
            {userData.access_token.length && advertId ? (
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
                                    <span>رزومه‌های دریافتی</span>
                                </>
                            }
                        >
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

export default RestaurantResumeList;
