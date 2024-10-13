import React, { useContext, useEffect, useState } from "react";

import { Button, Card, Col, Input, Table, Pagination, Select } from "antd";

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

const NewUsersList = () => {
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
        setPageFilter,
        backBtnHandler,
        handleDateChange,
        handleOpenChange,
        setIsLoading,
    } = useTableData();

    const { setUserPlace } = useContext(UserContext);
    const { setToastifyObj } = useContext(CommonContext);

    const [jobTitle, setJobTitle] = useState();
    const [searchObj, setSearchObj] = useState({
        jobStatus: "",
        searchPhone: "",
        searchJob: "",
        searchName: "",
        JobTitleId: "",
        dateValue: dateValue,
    });

    const navigate = useNavigate();

    const detailBtnClickHandler = (id) => {
        console.log("ID >>", id);

        setUserPlace(`user-profile-${id}`);
        navigate(`/user-profile/${id}`);
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
                        value={searchObj.searchName}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                searchName: convertFAtoEN(e.target.value),
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
                        onChange={(value) =>
                            setSearchObj((prevState) => ({
                                ...prevState,
                                JobTitleId: value,
                            }))
                        }
                        style={{ width: "80%" }}
                        options={
                            jobTitle
                                ? jobTitle.map((item) => ({
                                      value: item.id,
                                      label: item.title,
                                  }))
                                : ""
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
            width: "18%",
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
                    تاریخ ثبت‌نام
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
                    icon={sortIcon("jobStatus", sortMode)}
                    onClick={() => sortTable("jobStatus")}
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
                        onChange={(value) =>
                            setSearchObj((prevState) => ({
                                ...prevState,
                                jobStatus: value,
                            }))
                        }
                        options={[
                            { value: "", label: "همه" },
                            { value: "unknown", label: "نا معلوم" },
                            {
                                value: "better",
                                label: "به دنبال کار بهتر",
                            },
                            {
                                value: "ready",
                                label: "آماده به کار",
                            },
                            {
                                value: "working",
                                label: "مشغول به کار",
                            },
                        ]}
                    />
                ) : (
                    <div
                        className="status-tag"
                        style={{ background: text.backColor }}
                    >
                        <div
                            className="status-dot"
                            style={{ background: text.color }}
                        ></div>
                        {text.title}
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
        setPageFilter((prevState) => ({ ...prevState, status: "" }));

        const getJobTitles = async () => {
            try {
                const res = await getRequest(
                    `/options/jobTitles`,
                    true,
                    setToastifyObj
                );

                if (res.success) {
                    setJobTitle([{ id: "", title: "همه" }, ...res.data]);
                } else {
                    throw new Error("Unsuccessful fetch /options/jobTitles");
                }
            } catch (error) {
                console.log("Error in UsersList-getData: ", error);
            }
        };

        getJobTitles();
    }, []);

    const getData = async () => {
        setIsLoading(true);

        try {
            const res = await getRequest(
                `/${"users"}?jobStatus=${
                    searchObj.jobStatus
                }&adminStatus=${"PENDING"}&sortBy=${
                    pageFilter.sortBy
                }&sortOrder=${
                    pageFilter.sortOrder
                }&page=${currentPage}&searchPhone=${
                    searchObj.searchPhone
                }&searchJob=${searchObj.searchJob}&searchName=${
                    searchObj.searchName
                }&JobTitleId=${searchObj.JobTitleId}&date=${
                    dateValue === "1348/10/11" ? "" : dateValue
                }`,
                true,
                setToastifyObj
            );

            console.log("RESSSSS >>", res);

            if (res.success) {
                const restaurants = res.data["users"];
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
                            <span>لیست کارجوهای جدید</span>
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

export default NewUsersList;
