import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Form, Flex, Spin } from "antd";
import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import TextArea from "antd/es/input/TextArea";
import { UserContext } from "../../store/UserContextProvider";
import { getRequest, postRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";
import UploadImage from "../Common/UploadImage";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";

const CreateNewRestaurant = () => {
    const { setUserPlace } = useContext(UserContext);
    const { setToastifyObj } = useContext(CommonContext);

    const [form] = Form.useForm();

    const [jobTypesData, setJobTypesData] = useState();
    const [selectedJobTypeId, setSelectedJobTypeId] = useState();
    const [imageName, setImageName] = useState();

    const backBtnHandler = () => {
        setUserPlace("restaurants-list");
    };

    const createPostObj = () => {
        const formData = form.getFieldValue();

        return {
            jobTitle: formData.jobTitle || null,
            phoneNumber: convertFAtoEN(formData.phoneNumber),
            branch: formData.branch,
            aboutUs: formData.aboutUs,
            imageFileName: imageName || null,
            jobTypeId: selectedJobTypeId,
            cityId: 1, // ?
            contacts: {
                phoneNumber: convertFAtoEN(formData.connectionPhoneNumber),
                instagram: formData.instagram,
                telegram: formData.telegram,
                lat: 35.770722, // Static value
                long: 51.438833, // Static value
                address: formData.address,
            },
        };
    };

    // For testing
    const onFormValuesChange = (changedValues, allValues) => {
        console.log("Changed Values:", changedValues);
        console.log("All Form Values:", allValues);
    };

    const submitForm = async () => {
        console.log("-- SUBMIT --");

        const postObj = createPostObj();

        console.log("postObj >>", postObj);

        try {
            const res = await postRequest(
                "/restaurants",
                postObj,
                true,
                setToastifyObj
            );

            if (res.success) {
                setToastifyObj(() => ({
                    title: res.message,
                    mode: "success",
                }));

                console.log("success-res >> ", res);

                setUserPlace("restaurants-list");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("ERROR >>", error);
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getRequest(
                    "/options/jobTypes",
                    true,
                    setToastifyObj
                );

                if (res && res.success) {
                    setJobTypesData(res.data);

                    console.log("success res >>", res);
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.error(`Error in CreateNewRestaurant-getData: `, error);
            }
        };

        getData();
    }, []);

    return (
        <Row gutter={[24, 24]} className="create-new-restaurant">
            <Col span={24} className="table-section">
                {jobTypesData ? (
                    <Card>
                        <Form
                            form={form}
                            name="restaurant-base-info-form"
                            layout="vertical"
                            autoComplete="off"
                            // onValuesChange={onFormValuesChange}
                        >
                            <div className="card-header">
                                <div
                                    className="back-arrow-btn"
                                    onClick={backBtnHandler}
                                >
                                    <BackIcon />
                                </div>

                                <div className="restaurant-title">
                                    ثبت رستوران جدید
                                </div>
                            </div>

                            <div className="restaurant-base-info">
                                <div className="card-section-title">
                                    اطلاعات پایه
                                </div>

                                <Row gutter={[48, 10]}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="عنوان مجموعه"
                                            name="jobTitle"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item label="شعبه" name="branch">
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item
                                            label="شماره موبایل"
                                            name="phoneNumber"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={16}>
                                        <Form.Item
                                            label="درباره ما"
                                            name="aboutUs"
                                        >
                                            <TextArea
                                                autoSize={{
                                                    minRows: 5,
                                                    maxRows: 5,
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item label="تصویر پروفایل">
                                            <UploadImage
                                                imageName={imageName}
                                                setImageName={setImageName}
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                        <Form.Item label="نوع کسب و کار">
                                            {jobTypesData.map((type) => (
                                                <Button
                                                    type="default"
                                                    key={type.id}
                                                    className={`${
                                                        selectedJobTypeId ===
                                                        type.id
                                                            ? "active-button"
                                                            : ""
                                                    } card-btn`}
                                                    onClick={() =>
                                                        setSelectedJobTypeId(
                                                            type.id
                                                        )
                                                    }
                                                >
                                                    {type.title}
                                                </Button>
                                            ))}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>

                            <div className="restaurant-contact-section">
                                <div className="card-section-title">
                                    راه‌های ارتباطی
                                </div>

                                <Row gutter={[48, 10]}>
                                    <Col span={8}>
                                        <Form.Item
                                            label="شماره موبایل (خط ارتباطی)"
                                            name="connectionPhoneNumber"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item
                                            label="اینستاگرام"
                                            name="instagram"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item
                                            label="تلگرام"
                                            name="telegram"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24}>
                                        <Form.Item label="آدرس" name="address">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>

                            <div className="submit-section">
                                <Flex justify="flex-end">
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="submit-btn"
                                            onClick={() => submitForm()}
                                        >
                                            ثبت اطلاعات
                                        </Button>
                                    </Form.Item>
                                </Flex>
                            </div>
                        </Form>
                    </Card>
                ) : (
                    <Spin size="large" className="loading-token-spinner" />
                )}
            </Col>
        </Row>
    );
};

export default CreateNewRestaurant;
