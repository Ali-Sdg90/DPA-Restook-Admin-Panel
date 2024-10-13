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

import { ReactComponent as Arrow } from "../assets/images/home-page/Chevron - Left.svg";
import { sortIcon } from "../utils/tableIconSort";
import useTableData from "../hooks/useTableData";
import { AuthContext } from "../store/AuthContextProvider";
import { UserContext } from "../store/UserContextProvider";
import { getRequest } from "../services/apiService";
import ImageWithFallback from "../components/Common/ImageWithFallback";
import PageWrapper from "../components/Common/PageWrapper";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useNavigate } from "react-router-dom";
import { convertFAtoEN } from "../utils/convertFAtoENNumbers";
import { CommonContext } from "../store/CommonContextProvider";

const UsersList = () => {
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
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { setToastifyObj } = useContext(CommonContext);

    const [jobTitle, setJobTitle] = useState();

    const navigate = useNavigate();

    const [searchObj, setSearchObj] = useState({
        jobStatus: "",
        adminStatus: "",
        searchPhone: "",
        searchJob: "",
        searchName: "",
        JobTitleId: "",
        dateValue: dateValue,
    });

    const detailBtnHandler = (id) => {
        console.log("id >>", id);

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
                        options={jobTitle.map((item) => ({
                            value: item.id,
                            label: item.title,
                        }))}
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
                            onClick={() => detailBtnHandler(record.id)}
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

        const getData = async () => {
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

        getData();
    }, []);

    const getData = async () => {
        setIsLoading(true);

        try {
            if (pageFilter.status === "") {
                const res = await getRequest(
                    `/${"users"}?jobStatus=${searchObj.jobStatus}&adminStatus=${
                        searchObj.adminStatus
                    }&sortBy=${pageFilter.sortBy}&sortOrder=${
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
            }
        } catch (error) {
            console.error("Error in ExternalAdvertList-getData: ", error);
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("users-list");
        }
    }, []);

    return (
        <PageWrapper>
            {userData.access_token.length ? (
                <Row gutter={[24, 24]} className="content">
                    <Col span={24} className="table-section">
                        <Card title="لیست کارجوها">
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
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default UsersList;
