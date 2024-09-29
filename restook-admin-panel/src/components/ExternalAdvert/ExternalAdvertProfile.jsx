import React, { useContext, useEffect } from "react";
import { Row, Col, Card, Spin, Form, Flex, Button } from "antd";
import ExternalAdvertFirstCard from "./ExternalAdvertFirstCard";
import ExternalAdvertJobConditions from "./ExternalAdvertJobConditions";
import ExternalAdvertJobAdvantages from "./ExternalAdvertJobAdvantages";
import ExternalAdvertAdditionalInfo from "./ExternalAdvertAdditionalInfo";
import { ExternalAdvertContext } from "../../store/ExternalAdvertContextProvider";
import { deleteRequest, postRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";
import { mergeObjectFunc } from "../../utils/mergeObjectFuncExternalAdvert";
import { convertToPostObj } from "../../utils/convertToPostObjExternalAdvert";
import { UserContext } from "../../store/UserContextProvider";

const ExternalAdvertProfile = () => {
    const {
        isAllDataFetched = false,
        form,
        mappedData,
        profileId,
    } = useContext(ExternalAdvertContext);

    const { setToastifyObj } = useContext(CommonContext);
    const { setUserPlace } = useContext(UserContext);

    const deleteBtnHandler = async () => {
        console.log("-- DELETE --");

        try {
            const res = await deleteRequest(
                `/temp/deleteTempRestaurant?id=${mappedData.restaurantId}`,
                true,
                setToastifyObj
            );

            if (res.success) {
                setToastifyObj(() => ({
                    title: res.message,
                    mode: "success",
                }));

                console.log("success-res >>", res);

                setUserPlace("external-advert-list");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("ERROR >>", error);
        }
    };

    const submitForm = async () => {
        console.log("-- SUBMIT --");

        const mergedObject = mergeObjectFunc(form.getFieldsValue(), mappedData);
        console.log("mergedObject >> ", mergedObject);

        const postObject = convertToPostObj(
            mergedObject,
            profileId,
            mappedData.alreadyExist,
            "ExternalAdvert"
        );

        console.log("postObject >>", postObject);

        try {
            const res = await postRequest(
                "/temp/AddAdvertisement",
                postObject,
                true,
                setToastifyObj
            );

            if (res.success) {
                setToastifyObj(() => ({
                    title: res.message,
                    mode: "success",
                }));

                console.log("success-res >>", res);

                setUserPlace("external-advert-list");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("ERROR >>", error);
        }
    };

    return (
        <>
            {isAllDataFetched === true && form ? (
                <Row gutter={[24, 24]} className="content">
                    <Col span={24} className="external-advert-card">
                        {mappedData ? (
                            <>
                                <Form
                                    form={form}
                                    name="restaurant-base-info-form"
                                    layout="vertical"
                                    autoComplete="off"
                                    initialValues={mappedData}
                                >
                                    <ExternalAdvertFirstCard
                                        usePrefixForImage={false}
                                        forceFalseAlreadyExist={false}
                                    />
                                    <ExternalAdvertJobConditions />
                                    <ExternalAdvertJobAdvantages />
                                    <ExternalAdvertAdditionalInfo />
                                </Form>

                                <Flex
                                    justify="space-between"
                                    className="footer-btns"
                                >
                                    <Form.Item>
                                        {mappedData.alreadyExist ? (
                                            ""
                                        ) : (
                                            <Button
                                                type="primary"
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteBtnHandler()
                                                }
                                            >
                                                حذف مجموعه
                                            </Button>
                                        )}
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            className="submit-btn"
                                            onClick={() => submitForm()}
                                        >
                                            ثبت اطلاعات
                                        </Button>
                                    </Form.Item>
                                </Flex>
                            </>
                        ) : (
                            <Spin
                                size="large"
                                className="loading-token-spinner"
                            />
                        )}
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </>
    );
};

export default ExternalAdvertProfile;
