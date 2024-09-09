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
    // DatePicker,
} from "antd";
import { InputDatePicker } from "jalaali-react-date-picker";
import { ReactComponent as Calender } from "../../assets/images/home-page/Calendar - Dates (1).svg";
import { ReactComponent as Arrow } from "../../assets/images/home-page/Chevron - Left.svg";
import { sortIcon } from "../../utils/tableIconSort";
import { getTableData } from "../../services/getTableData";
import useTableData from "../../hooks/useTableData";
import { UserContext } from "../../store/UserContextProvider";
import { getRequest } from "../../services/apiService";
import ImageWithFallback from "../Common/ImageWithFallback";

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
        sortTable,
        handleInputChange,
        setTableData,
        setTotalPage,
        handlePageChange,
        setPageFilter,
        handleDateChange,
        handleOpenChange,
    } = useTableData();

    const { userPlace, setUserPlace } = useContext(UserContext);

    const detailsHandler = (id) => {
        console.log("id >>", id);
        setUserPlace(`external-advert-profile-${id}`);
    };

    const [jobTitle, setJobTitle] = useState();

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
                        value={record.address}
                        onChange={(e) => {
                            handleInputChange(e, record.key, "restaurantTitle");
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
                    عنوان آگهی
                </Button>
            ),
            dataIndex: "jobTitle",
            key: "jobTitle",
            width: "15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
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
            width: "16%",
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
            sortBy: "", // temp until its API write
        }));
        console.log("RESET --------------------------------");
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const jobTitleRes = await getRequest(`/options/jobTitles`);

                if (jobTitleRes.success) {
                    setJobTitle([
                        { id: "", title: "همه" },
                        ...jobTitleRes.data,
                    ]);
                } else {
                    throw new Error("Unsuccessful fetch /options/jobTitles");
                }

                if (pageFilter.status === "") {
                    const tableDataRes = await getTableData(
                        "temp/tempAds",
                        pageFilter,
                        currentPage,
                        true,
                        "advertisements"
                    );

                    setTableData(tableDataRes[0]);
                    setTotalPage(tableDataRes[1]);
                }
            } catch (error) {
                console.error("Error in ExternalAdvertList-getData: ", error);
            }
        };

        if (userPlace === "default") {
            setUserPlace("external-advert-list");
        }

        getData();
    }, [pageFilter, currentPage]);

    return (
        <Row gutter={[24, 24]} className="content">
            <Col span={24} className="table-section">
                <Card title="لیست آگهی‌ها">
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
    );
};

export default ExternalAdvertList;
