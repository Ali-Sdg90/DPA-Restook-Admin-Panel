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
import { ReactComponent as Calender } from "../assets/images/home-page/Calendar - Dates (1).svg";
import { sortIcon } from "../utils/tableIconSort";
import { getTableData } from "../services/getTableData";
import useTableData from "../hooks/useTableData";
import { AuthContext } from "../store/AuthContextProvider";
import { UserContext } from "../store/UserContextProvider";
import { getRequest } from "../services/apiService";
import ImageWithFallback from "../components/Common/ImageWithFallback";
import PageWrapper from "../components/Common/PageWrapper";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useNavigate } from "react-router-dom";

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
    const { userPlace, setUserPlace } = useContext(UserContext);
    const [jobTitle, setJobTitle] = useState();

    const navigate = useNavigate();

    const detailBtnHandler = (id) => {
        console.log("id >>", id);

        setUserPlace(`user-profile-${id}`);
        navigate(`/user-profile/${id}`);
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
                        // onChange={handleChange}
                        options={[
                            { value: "همه", label: "همه" },
                            { value: "نا معلوم", label: "نا معلوم" },
                            {
                                value: "به دنبال کار بهتر",
                                label: "به دنبال کار بهتر",
                            },
                            {
                                value: "آماده به کار",
                                label: "آماده به کار",
                            },
                            {
                                value: "مشغول به کار",
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
                const res = await getRequest(`/options/jobTitles`);

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

    useEffect(() => {
        const getData = async () => {
            const res = await getTableData(
                "users",
                pageFilter,
                currentPage,
                true
            );

            console.log("RESsSsSsSs >> ", res);

            setTableData(res[0]);
            setTotalPage(res[1] ? res[1] : 1);
        };

        if (pageFilter.status === "") {
            getData();
        }
    }, [pageFilter, currentPage]);

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

export default UsersList;
