import React, { useContext } from "react";

import { Button, Card, Col, Input, Row, Form } from "antd";

import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import { ExternalAdvertContext } from "../../store/ExternalAdvertContextProvider";
import TextArea from "antd/es/input/TextArea";
import ImageWithFallback from "../Common/ImageWithFallback";

const ExternalAdvertFirstCard = ({
    usePrefixForImage,
    forceFalseAlreadyExist = false,
}) => {
    const { profileImg, jobTypes, mappedData, backBtnHandler, setMappedData } =
        useContext(ExternalAdvertContext);

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
                            needPrefix={usePrefixForImage}
                        />
                    ) : (
                        <div className="restaurant-img-placeholder"></div>
                    )}
                </div>

                <div className="restaurant-title">
                    <div className="restaurant-info-text">اطلاعات مجموعه</div>
                    <div className="restaurant-name">
                        {mappedData.jobTitleRestaurant
                            ? mappedData.jobTitleRestaurant
                            : "_"}
                    </div>

                    {mappedData.website ? (
                        <div className="restaurant-address">
                            آدرس وبسایت:{" "}
                            <a
                                href={"https://" + mappedData.website}
                                target="_blank"
                            >
                                {mappedData.website}
                            </a>
                        </div>
                    ) : (
                        <div className="empty-address"></div>
                    )}

                    <a
                        href={mappedData.advertisementUrl}
                        className="open-jv-link"
                        target="_blank"
                    >
                        مشاهده آگهی در سایت مرجع
                    </a>
                </div>
            </div>

            {!mappedData.alreadyExist && !forceFalseAlreadyExist ? (
                <>
                    <div className="restaurant-base-info">
                        <div className="card-section-title">اطلاعات پایه</div>

                        <Row gutter={[48, 10]}>
                            <Col span={8}>
                                <Form.Item
                                    label="عنوان مجموعه"
                                    name="jobTitleAdvert"
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
                                <Form.Item label="درباره ما" name="aboutUs">
                                    <TextArea
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
                                    <Input />
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
                                <Form.Item label="اینستاگرام" name="instagram">
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item label="تلگرام" name="telegram">
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
                </>
            ) : (
                ""
            )}
        </Card>
    );
};

export default ExternalAdvertFirstCard;
