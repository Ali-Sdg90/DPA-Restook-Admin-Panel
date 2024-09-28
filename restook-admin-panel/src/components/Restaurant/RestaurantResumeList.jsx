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
import useTableData from "../../hooks/useTableData";
import ImageWithFallback from "../Common/ImageWithFallback";
import { InputDatePicker } from "jalaali-react-date-picker";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../store/UserContextProvider";
import PageWrapper from "../Common/PageWrapper";
import { AuthContext } from "../../store/AuthContextProvider";
import { getRequest } from "../../services/apiService";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";

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

    const [advertId, setAdvertId] = useState();

    const { id: restaurantID } = useParams();

    const navigate = useNavigate();

    const [jobTitle, setJobTitle] = useState();
    const [searchObj, setSearchObj] = useState({
        status: "",
        search: "",
        jobTitleId: "",
        searchPhoneNumber: "",
        dateValue: dateValue,
    });

    const detailBtnClickHandler = (resumeID) => {
        console.log("resumeID >>", resumeID);

        setUserPlace(`user-profile-${resumeID}`);
        navigate(
            `/resume-user-profile/${advertId}/${restaurantID}/${resumeID}`
        );
    };

    useEffect(() => {
        setSearchObj((prevState) => ({
            ...prevState,
            [dateValue]: dateValue,
        }));
    }, [dateValue]);

    useEffect(() => {
        console.log("searchObj >>", searchObj);

        if (advertId) {
            getData();
        }
    }, [searchObj, pageFilter, currentPage, advertId]);

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
                        value={searchObj.search}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                search: convertFAtoEN(e.target.value),
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
                                jobTitleId: value,
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
                        value={searchObj.searchResTitle}
                        onChange={(e) => {
                            setSearchObj((prevState) => ({
                                ...prevState,
                                searchPhoneNumber: convertFAtoEN(
                                    e.target.value
                                ),
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
                        onChange={(value) =>
                            setSearchObj((prevState) => ({
                                ...prevState,
                                status: value,
                            }))
                        }
                        options={[
                            { value: "", label: "همه" },
                            { value: "1", label: "دیده نشده" },
                            { value: "2", label: "دیده شده" },
                            { value: "3", label: "رد شده" },
                            { value: "4", label: "تماس تلفن" },
                            { value: "5", label: "تایید شده" },
                            { value: "6", label: "زمان مصاحبه" },
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

    const getData = async () => {
        setIsLoading(true);

        try {
            const res = await getRequest(
                `/${"sent-resumes"}?sortBy=${pageFilter.sortBy}&sortOrder=${
                    pageFilter.sortOrder
                }&status=${
                    searchObj.status
                }&page=${currentPage}&searchPhoneNumber=${
                    searchObj.searchPhoneNumber
                }&search=${searchObj.search}&jobTitleId=${
                    searchObj.jobTitleId
                }&advertisementId=${advertId}&date=${
                    dateValue === "1348/10/11" ? "" : dateValue
                }`
            );

            console.log("RESSSSS >>", res);

            if (res.success) {
                const restaurants = res.data["sentResumes"];
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

export default RestaurantResumeList;
