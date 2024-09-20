import React, { useContext, useEffect } from "react";

import { Button, Card, Col, Input, Table, DatePicker, Pagination } from "antd";

import { ReactComponent as Arrow } from "../../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as Calender } from "../../assets/images/home-page/Calendar - Dates (1).svg";
import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import { sortIcon } from "../../utils/tableIconSort";
import { getTableData } from "../../services/getTableData";
import useTableData from "../../hooks/useTableData";
import ImageWithFallback from "../Common/ImageWithFallback";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../store/UserContextProvider";
import { getRequest } from "../../services/apiService";

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
        sortTable,
        handleInputChange,
        setTableData,
        setTotalPage,
        backBtnHandler,
        handleDateChange,
        handleOpenChange,
        handlePageChange,
    } = useTableData();

    const { setUserPlace } = useContext(UserContext);

    const navigate = useNavigate();

    const detailBtnClickHandler = (id) => {
        console.log("ID >>", id);

        setUserPlace(`restaurant-profile-${id}`);
        navigate(`/restaurant-profile/${id}`);
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

    useEffect(() => {
        const getData = async () => {
            // const res = await getTableData(
            //     "restaurants",
            //     pageFilter,
            //     currentPage,
            //     true
            // );

            // setTableData(res[0]);
            // setTotalPage(res[1] ? res[1] : 1);

            const res = await getRequest(
                `/${"restaurants"}?${"adminStatus"}=${
                    pageFilter.status
                }&sortBy=${pageFilter.sortBy}&sortOrder=${
                    pageFilter.sortOrder
                }&page=${currentPage}`
            );

            console.log("RESSSSS >>", res);

            if (res.success) {
                const restaurants = res.data["restaurants"];
                restaurants.unshift({ id: -1 });

                setTableData(restaurants);
                setTotalPage(res.data.totalPages || 1);
            } else {
                console.log("ERROR IN FILTERING!", res);
            }
        };

        getData();
    }, [pageFilter, currentPage]);

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
        </>
    );
};

export default NewRestaurantsList;
