import React, { useContext, useEffect, useState } from "react";

import { Button, Card, Col, Input, Table, DatePicker, Pagination } from "antd";
import QuickAccess from "./QuickAccess";

import { ReactComponent as Arrow } from "../../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import { sortIcon } from "../../utils/tableIconSort";
import useTableData from "../../hooks/useTableData";
import ImageWithFallback from "../Common/ImageWithFallback";
import { UserContext } from "../../store/UserContextProvider";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../../services/apiService";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";
import { CommonContext } from "../../store/CommonContextProvider";

const NewAdvertisementsList = () => {
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

    const navigate = useNavigate();

    const { userPlace, setUserPlace } = useContext(UserContext);
    const { setToastifyObj } = useContext(CommonContext);

    const [searchObj, setSearchObj] = useState({
        searchPhone: "",
        searchAdTitle: "",
        searchResTitle: "",
        dateValue: dateValue,
    });

    const detailBtnClickHandler = (id) => {
        console.log("id >>", id);

        setUserPlace("advertisement-review");
        navigate(`/advertisement-review/${id}`);
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
            width: "19.67%",
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
            width: "21.08%",
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
            width: "14.15%",
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
                            onClick={() => detailBtnClickHandler(record.id)}
                        >
                            جزئیات
                        </Button>
                    );
                }
            },
        },
    ];

    const getData = async () => {
        setIsLoading(true);

        try {
            const res = await getRequest(
                `/${"advertisements"}?status=pending&sortBy=${
                    pageFilter.sortBy
                }&sortOrder=${
                    pageFilter.sortOrder
                }&page=${currentPage}&searchPhone=${
                    searchObj.searchPhone
                }&searchAdTitle=${searchObj.searchAdTitle}&searchResTitle=${
                    searchObj.searchResTitle
                }&restaurantId=${""}&date=${
                    dateValue === "1348/10/11" ? "" : dateValue
                }`,
                true,
                setToastifyObj
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
        } catch (error) {
            console.error("Error in ExternalAdvertList-getData: ", error);
        }

        setIsLoading(false);
    };

    return (
        <>
            {userPlace === "home-page" && <QuickAccess />}

            <Col span={24} className="table-section">
                <Card
                    title={
                        <>
                            {userPlace !== "home-page" && (
                                <span
                                    onClick={backBtnHandler}
                                    className="back-arrow-btn"
                                >
                                    <BackIcon />
                                </span>
                            )}

                            <span>لیست آگهی جدید</span>
                        </>
                    }
                >
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
        </>
    );
};

export default NewAdvertisementsList;
