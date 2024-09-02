import React, { useContext } from "react";

import {
    Button,
    Card,
    Col,
    Input,
    Row,
    Form,
} from "antd";

import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import ImageWithFallback from "../ImageWithFallback";
import { ExternalAdvertContext } from "../../store/ExternalAdvertContextProvider";
import TextArea from "antd/es/input/TextArea";

const ExternalAdvertFirstCard = () => {
    const {
        profileImg,
        apiResponse,
        jobTypes,
        mappedData,
        backBtnHandler,
        setMappedData,
    } = useContext(ExternalAdvertContext);

    return (
        <Card className="first-card">
            <div className="card-header">
                <div className="back-arrow-btn" onClick={backBtnHandler}>
                    <BackIcon />
                </div>

                <div className="restaurant-img-container">
                    {profileImg ? (
                        <ImageWithFallback
                            imageUrl={profileImg}
                            className={"restaurant-img"}
                            alt={"restaurant-img"}
                            needPrefix={false}
                        />
                    ) : (
                        <div className="restaurant-img-placeholder"></div>
                    )}
                </div>

                <div className="restaurant-title">
                    <div className="restaurant-info-text">اطلاعات مجموعه</div>
                    <div className="restaurant-name">
                        {apiResponse &&
                        apiResponse.restaurant &&
                        apiResponse.restaurant.jobTitle
                            ? apiResponse.restaurant.jobTitle
                            : "_"}
                    </div>
                    <div className="restaurant-address">
                        آدرس وبسایت:{" "}
                        {apiResponse.restaurant &&
                        apiResponse.restaurant.website
                            ? apiResponse.restaurant.website
                            : "_"}
                    </div>
                </div>
            </div>

            {/* {apiResponse.restaurant.alreadyExist ? ( */}
            {true ? ( // temp
                <>
                    <div className="restaurant-base-info">
                        <div className="section-title">اطلاعات پایه</div>

                        <Row gutter={[48, 10]}>
                            <Col span={8}>
                                <Form.Item label="عنوان مجموعه" name="jobTitle">
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="شعبه" name="branch">
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    label="شماره موبایل"
                                    name="phoneNumber"
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>

                            <Col span={16}>
                                <Form.Item label="درباره ما" name="aboutUs">
                                    <TextArea
                                        placeholder=""
                                        autoSize={{
                                            minRows: 5,
                                            maxRows: 5,
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    label="تصویر پروفایل"
                                    name="imageFileName"
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="نوع کسب و کار">
                                    {jobTypes.map((type) => (
                                        <Button
                                            type="default"
                                            key={type.id}
                                            className={`${
                                                mappedData.jobTypeId === type.id
                                                    ? "active-button"
                                                    : ""
                                            } card-btn`}
                                            onClick={() =>
                                                setMappedData((prevState) => ({
                                                    ...prevState,
                                                    jobTypeId: type.id,
                                                }))
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
                        <div className="section-title">راه‌های ارتباطی</div>

                        <Row gutter={[48, 10]}>
                            <Col span={8}>
                                <Form.Item
                                    label="شماره موبایل (خط ارتباطی)"
                                    name="phoneNumber"
                                >
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="اینستاگرام" name="instagram">
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="تلگرام" name="telegram">
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="آدرس" name="address">
                                    <Input placeholder="" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                </>
            ) : (
                ""
            )}
        </Card>
    );
};

export default ExternalAdvertFirstCard;
