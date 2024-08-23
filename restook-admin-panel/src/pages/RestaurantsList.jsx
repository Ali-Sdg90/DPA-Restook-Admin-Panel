import React, { useContext, useEffect } from "react";

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

import { PlusOutlined } from "@ant-design/icons";

import { ReactComponent as Arrow } from "../assets/images/home-page/Chevron - Left.svg";
import { sortIcon } from "../utils/tableIconSort";
import { getTableData } from "../services/getTableData";
import useTableData from "../hooks/useTableData";
import { UserContext } from "../store/UserContextProvider";
import ImageWithFallback from "../components/ImageWithFallback";
import { AuthContext } from "../store/AuthContextProvider";
import PageWrapper from "../components/PageWrapper";
import { useNavigate } from "react-router-dom";

const RestaurantsList = () => {
    const { setUserPlace } = useContext(UserContext);

    const {
        pageFilter,
        tableData,
        totalPage,
        sortMode,
        sortTable,
        handleInputChange,
        setTableData,
        setTotalPage,
        handlePageChange,
        currentPage,
        setPageFilter,
    } = useTableData();

    const { userData } = useContext(AuthContext);

    const navigate = useNavigate();

    const detailsHandler = (id) => {
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
            width: "19.08%",
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
                    icon={sortIcon("adminStatusTitle", sortMode)}
                    onClick={() => sortTable("adminStatusTitle")}
                >
                    وضعیت
                </Button>
            ),
            dataIndex: "adminStatusTitle",
            key: "adminStatusTitle",
            width: "14.15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Select
                        defaultValue="همه"
                        // onChange={handleChange}
                        options={[
                            { value: "همه", label: "همه" },
                            { value: "فعال", label: "فعال" },
                            { value: "غیرفعال", label: "غیرفعال" },
                        ]}
                    />
                ) : (
                    <div
                        style={{
                            backgroundColor:
                                text === "غیر فعال" ? "#F5D6D6" : "#AAE9CE",
                        }}
                        className="activity-status-tag"
                    >
                        {text}
                    </div>
                ),
        },
        {
            title: "",
            dataIndex: "id",
            key: "details",
            render: (text, record, index) => {
                if (index !== 0) {
                    return (
                        <Button
                            type="text"
                            icon={<Arrow />}
                            iconPosition={"end"}
                            className="details-btn"
                            onClick={() => detailsHandler(text)}
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
        console.log("RESET --------------------------------");
    }, []);

    useEffect(() => {
        const getData = async () => {
            const res = await getTableData(
                "restaurants",
                pageFilter,
                currentPage,
                true
            );

            console.log("RESsSsSsSs >> ", res);

            setTableData(res[0]);
            setTotalPage(res[1]);
        };

        if (pageFilter.status === "") {
            getData();
        }
    }, [pageFilter, currentPage]);

    return (
        <PageWrapper>
            {userData.access_token.length ? (
                <Row gutter={[24, 24]} className="content">
                    <Col span={24} className="table-section">
                        <Card title="لیست مجموعه‌ها">
                            <div className="new-restaurant-container">
                                <Button
                                    type="primary"
                                    className="new-restaurant-btn"
                                >
                                    مجموعه جدید
                                    <PlusOutlined />
                                </Button>
                            </div>

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

export default RestaurantsList;
