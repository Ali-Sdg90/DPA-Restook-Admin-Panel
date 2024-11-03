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
    TimePicker,
} from "antd";

import { ReactComponent as DownArrowIcon } from "../../assets/images/restaurants-page/Chevron - Down (2).svg";

import { sortIcon } from "../../utils/tableIconSort";
import useTableData from "../../hooks/useTableData";

import { AuthContext } from "../../store/AuthContextProvider";
import { UserContext } from "../../store/UserContextProvider";

import { getRequest } from "../../services/apiService";
import PageWrapper from "../Common/PageWrapper";
import { InputDatePicker } from "jalaali-react-date-picker";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";
import { CommonContext } from "../../store/CommonContextProvider";

import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";

import dayjs from "dayjs";

const TransactionsList = ({ resID }) => {
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
        handleDateChange,
        handleOpenChange,
    } = useTableData();

    const { userData } = useContext(AuthContext);
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { setToastifyObj } = useContext(CommonContext);

    const [searchObj, setSearchObj] = useState({
        status: "",
        paymentType: "",
        clientRefId: "",
        amount: "",
        restaurantId: resID,
        restaurantTitle: "",
        time: "",
        dateValue: dateValue,
    });
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    useEffect(() => {
        setSearchObj((prevState) => ({
            ...prevState,
            [dateValue]: dateValue,
        }));
    }, [dateValue]);

    useEffect(() => {
        getData();
    }, [searchObj, pageFilter, currentPage]);

    const timePickerHandler = (time, timeString) => {
        console.log("formatted string >>", timeString);

        setSearchObj((prevState) => ({
            ...prevState,
            time: convertFAtoEN(timeString),
        }));
    };

    const tableColWidth = {
        pageMode: ["3%", "24%", "12%", "12%", "12%", "12%", "12%", "12%", "3%"],
        resMode: ["6%", "0%", "15%", "17%", "15%", "16%", "15%", "15%", "6%"],
    };

    const calcColWidth = (index) => {
        return tableColWidth[resID ? "resMode" : "pageMode"][index];
    };

    const columns = [
        { width: calcColWidth(0) },
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
            width: calcColWidth(1),
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={searchObj.restaurantTitle}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                restaurantTitle: convertFAtoEN(e.target.value),
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
                    icon={sortIcon("paymentType", sortMode)}
                    onClick={() => sortTable("paymentType")}
                >
                    نوع تراکنش
                </Button>
            ),
            dataIndex: "paymentTypeFormat",
            key: "paymentTypeFormat",
            width: calcColWidth(2),
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
                        onChange={(value) =>
                            setSearchObj((prevState) => ({
                                ...prevState,
                                paymentType: value,
                            }))
                        }
                        style={{ width: "80%" }}
                        options={[
                            { value: "", label: "همه" },
                            { value: "PROMOTION", label: "ارتقا آگهی" },
                            { value: "PACKAGE", label: "خرید بسته" },
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
                    icon={sortIcon("amount", sortMode)}
                    onClick={() => sortTable("amount")}
                >
                    مبلغ تراکنش
                </Button>
            ),
            dataIndex: "amount",
            key: "amount",
            width: calcColWidth(3),
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={searchObj.amount}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                amount: convertFAtoEN(e.target.value),
                            }));
                        }}
                    />
                ) : (
                    `${text} تومان`
                ),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("createdAt", sortMode)}
                    onClick={() => sortTable("createdAt")}
                >
                    تاریخ
                </Button>
            ),
            dataIndex: "date",
            key: "date",
            width: calcColWidth(4),
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
                    icon={sortIcon("time", sortMode)}
                    onClick={() => sortTable("time")}
                >
                    ساعت
                </Button>
            ),
            dataIndex: "time",
            key: "time",
            width: calcColWidth(5),
            render: (text, record, index) =>
                index === 0 ? (
                    <TimePicker
                        style={{ width: "80%" }}
                        format="HH:mm"
                        defaultOpenValue={dayjs("00:00", "HH:mm")}
                        placeholder=""
                        onChange={timePickerHandler}
                    />
                ) : (
                    text
                ),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("clientRefId", sortMode)}
                    onClick={() => sortTable("clientRefId")}
                >
                    کد رهگیری
                </Button>
            ),
            dataIndex: "clientRefId",
            key: "clientRefId",
            width: calcColWidth(7),
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={searchObj.clientRefId}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                clientRefId: convertFAtoEN(e.target.value),
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
                    icon={sortIcon("status", sortMode)}
                    onClick={() => sortTable("status")}
                >
                    وضعیت
                </Button>
            ),
            dataIndex: "jobStatus",
            key: "jobStatus",
            width: calcColWidth(8),
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
                        onChange={(value) =>
                            setSearchObj((prevState) => ({
                                ...prevState,
                                status: value,
                            }))
                        }
                        options={[
                            { value: "", label: "همه" },
                            { value: "SUCCESS", label: "موفق" },
                            { value: "FAIL", label: "ناموفق" },
                            {
                                value: "PENDING",
                                label: "در حال بررسی",
                            },
                        ]}
                    />
                ) : (
                    <div
                        className="status-tag"
                        style={{ background: record.statusBackColor }}
                    >
                        {record.statusFormat}
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
                            iconPosition={"end"}
                            className={`down-btn`}
                            onClick={() => handleExpandRow(record)}
                        >
                            <DownArrowIcon
                                className={`${
                                    expandedRowKeys.includes(record.id)
                                        ? "rotate-icon"
                                        : ""
                                }`}
                            />
                        </Button>
                    );
                }
            },
        },
        { width: calcColWidth(9) },
    ];

    const getData = async () => {
        setIsLoading(true);

        try {
            const res = await getRequest(
                `/transactions/restaurant?status=${
                    searchObj.status
                }&paymentType=${searchObj.paymentType}&sortBy=${
                    pageFilter.sortBy
                }&sortOrder=${
                    pageFilter.sortOrder
                }&page=${currentPage}&clientRefId=${
                    searchObj.clientRefId
                }&time=${searchObj.time}&restaurantTitle=${
                    searchObj.restaurantTitle
                }&amount=${searchObj.amount}&date=${
                    dateValue === "1348/10/11" ? "" : dateValue
                }&restaurantId=${searchObj.restaurantId}`,
                true,
                setToastifyObj
            );

            console.log("RESSSSS >>", res);

            if (res.success) {
                const restaurants = res.data["transactions"];
                restaurants.unshift({ id: -1 });

                setTableData(restaurants);
                setTotalPage(res.data.totalPages ? res.data.totalPages : 1);
            } else {
                console.log("ERROR IN FILTERING!");
            }
        } catch (error) {
            console.error("Error in TransactionsList-getData: ", error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("transaction-list");
        }
    }, []);

    const handleExpandRow = (record) => {
        setExpandedRowKeys(
            expandedRowKeys.includes(record.id)
                ? expandedRowKeys.filter((key) => key !== record.id)
                : [...expandedRowKeys, record.id]
        );
    };

    const backBtnHandler = () => {
        setUserPlace(`restaurant-profile-${resID}`);
    };

    return (
        <PageWrapper>
            {userData.access_token.length ? (
                <Row gutter={[24, 24]} className="content expandable-table">
                    <Col span={24} className="table-section">
                        <Card
                            title={
                                resID ? (
                                    <>
                                        <span
                                            onClick={backBtnHandler}
                                            className="back-arrow-btn"
                                        >
                                            <BackIcon />
                                        </span>
                                        <span>لیست تراکنش‌ها</span>
                                    </>
                                ) : (
                                    "پیگیری تراکنش‌های مالی"
                                )
                            }
                        >
                            <Table
                                loading={isLoading}
                                dataSource={tableData}
                                columns={resID ? columns.splice(2, 8) : columns}
                                pagination={false}
                                rowKey={(record) => record.id}
                                expandable={{
                                    expandedRowRender: (record) =>
                                        record.index !== 0 ? (
                                            <span className="expanded-row">
                                                <div>
                                                    عنوان خرید:{" "}
                                                    {record.paymentTitle}
                                                </div>
                                                <div>
                                                    منبع: {record.paymentSource}
                                                </div>
                                                <div>
                                                    پرداخت از: {record.card}
                                                </div>
                                                <div>
                                                    توضیحات:{" "}
                                                    {record.description || "_"}
                                                </div>
                                            </span>
                                        ) : (
                                            ""
                                        ),
                                    expandedRowKeys: expandedRowKeys,
                                    onExpand: (_, record) => {
                                        handleExpandRow(record);
                                    },
                                    expandIcon: () => null,
                                }}
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
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default TransactionsList;
