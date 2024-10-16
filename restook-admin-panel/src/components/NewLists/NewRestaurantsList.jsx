import React, { useContext, useEffect, useState } from "react";

import { Button, Card, Col, Input, Table, DatePicker, Pagination } from "antd";

import { ReactComponent as Arrow } from "../../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import { sortIcon } from "../../utils/tableIconSort";
import useTableData from "../../hooks/useTableData";
import ImageWithFallback from "../Common/ImageWithFallback";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserContextProvider";
import { getRequest } from "../../services/apiService";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";
import { CommonContext } from "../../store/CommonContextProvider";

const NewRestaurantsList = () => {
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
        setTableData,
        setTotalPage,
        handlePageChange,
        backBtnHandler,
        handleDateChange,
        handleOpenChange,
        setIsLoading,
    } = useTableData();

    const { setUserPlace } = useContext(UserContext);
    const { setToastifyObj } = useContext(CommonContext);

    const [searchObj, setSearchObj] = useState({
        searchPhone: "",
        searchBranch: "",
        searchTitle: "",
        dateValue: dateValue,
    });

    const navigate = useNavigate();

    const detailBtnClickHandler = (id) => {
        console.log("ID >>", id);

        setUserPlace(`restaurant-profile-${id}`);
        navigate(`/restaurant-profile/${id}`);
    };

    useEffect(() => {
        setSearchObj((prevState) => ({
            ...prevState,
            [dateValue]: dateValue,
        }));
    }, [dateValue]);

    useEffect(() => {
        // console.log("searchObj >>", searchObj);

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
            dataIndex: "createdAt",
            key: "createdAt",
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
                `/${"restaurants"}?adminStatus=PENDING&sortBy=${
                    pageFilter.sortBy
                }&sortOrder=${
                    pageFilter.sortOrder
                }&page=${currentPage}&searchPhone=${
                    searchObj.searchPhone
                }&searchBranch=${searchObj.searchBranch}&searchTitle=${
                    searchObj.searchTitle
                }&date=${dateValue === "1348/10/11" ? "" : dateValue}`,
                true,
                setToastifyObj
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
        } catch (error) {
            console.error("Error in ExternalAdvertList-getData: ", error);
        }

        setIsLoading(false);
    };

    return (
        <>
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
                            <span>لیست مجموعه‌های جدید</span>
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

export default NewRestaurantsList;
