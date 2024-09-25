import React, { useContext, useEffect, useState } from "react";

import { Button, Card, Col, Input, Table, Pagination, Select, Row } from "antd";

import { InputDatePicker } from "jalaali-react-date-picker";
import { ReactComponent as Arrow } from "../../assets/images/home-page/Chevron - Left.svg";
import { sortIcon } from "../../utils/tableIconSort";
import useTableData from "../../hooks/useTableData";
import { UserContext } from "../../store/UserContextProvider";
import { getRequest } from "../../services/apiService";
import ImageWithFallback from "../Common/ImageWithFallback";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";

const ExternalAdvertList = () => {
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

    const { userPlace, setUserPlace } = useContext(UserContext);

    const [searchObj, setSearchObj] = useState({
        searchPhone: "",
        searchAdTitle: "",
        searchResTitle: "",
        dateValue: dateValue,
    });

    const detailsHandler = (id) => {
        console.log("id >>", id);
        setUserPlace(`external-advert-profile-${id}`);
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
            width: "8.1%",
            render: (_, record, index) =>
                index !== 0 &&
                (record.imageUrl ? (
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
                        value={searchObj.searchResTitle}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                searchResTitle: convertFAtoEN(e.target.value),
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
                    <Input
                        value={searchObj.searchAdTitle}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                searchAdTitle: convertFAtoEN(e.target.value),
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
            width: "16%",
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
                    icon={sortIcon("createdAt", sortMode)}
                    onClick={() => sortTable("createdAt")}
                >
                    تاریخ ثبت
                </Button>
            ),
            dataIndex: "date",
            key: "date",
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
                            options={[
                                { value: "همه", label: "همه" },
                                { value: "ثبت نشده", label: "ثبت نشده" },
                                { value: "ثبت شده", label: "ثبت شده" },
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
        }));
        console.log("RESET --------------------------------");
    }, []);

    const getData = async () => {
        setIsLoading(true);

        try {
            if (pageFilter.status === "") {
                const res = await getRequest(
                    `/${"temp/tempAds"}?&sortBy=${
                        pageFilter.sortBy
                    }&sortOrder=${pageFilter.sortOrder}&date=${
                        dateValue === "1348/10/11" ? "" : dateValue
                    }&page=${currentPage}&searchPhone=${
                        searchObj.searchPhone
                    }&searchAdTitle=${searchObj.searchAdTitle}&searchResTitle=${
                        searchObj.searchResTitle
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

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("external-advert-list");
        }

        setIsLoading(true);
    }, []);

    return (
        <Row gutter={[24, 24]} className="content">
            <Col span={24} className="table-section">
                <Card title="لیست آگهی‌ها">
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
    );
};

export default ExternalAdvertList;
