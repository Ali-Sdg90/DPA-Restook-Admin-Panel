import React, { useContext, useEffect } from "react";
import { Row, Col, Card, Spin, Form, Flex, Button } from "antd";
import ExternalAdvertFirstCard from "./ExternalAdvertFirstCard";
import ExternalAdvertJobConditions from "./ExternalAdvertJobConditions";
import ExternalAdvertJobAdvantages from "./ExternalAdvertJobAdvantages";
import ExternalAdvertAdditionalInfo from "./ExternalAdvertAdditionalInfo";
import { ExternalAdvertContext } from "../../store/ExternalAdvertContextProvider";
import { postRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";
import { mergeObjectFunc } from "../../utils/mergeObjectFuncExternalAdvert";
import { convertToPostObj } from "../../utils/convertToPostObjExternalAdvert";

const ExternalAdvertProfile2 = () => {
    const {
        isAllDataFetched = false,
        form,
        mappedData,
        profileId,
    } = useContext(ExternalAdvertContext);

    const { setToastifyObj } = useContext(CommonContext);

    const submitForm = async () => {
        console.log("-- SUBMIT --");

        const mergedObject = mergeObjectFunc(form.getFieldsValue(), mappedData);
        console.log("mergedObject >> ", mergedObject);

        const postObject = convertToPostObj(
            mergedObject,
            profileId,
            mappedData.alreadyExist
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
                    title: `ثبت اطلاعات با موفقیت انجام شد`,
                    mode: "success",
                }));
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("ERROR >>", error);
        }
    };

    return (
        <>
            {isAllDataFetched === true ? (
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
                                    <>
                                        <ExternalAdvertFirstCard />
                                        <ExternalAdvertJobConditions />
                                        <ExternalAdvertJobAdvantages />
                                        <ExternalAdvertAdditionalInfo />
                                    </>

                                    {/* <ExternalAdvertFirstCard /> */}
                                    {/* <ExternalAdvertJobConditions /> */}
                                    {/* <ExternalAdvertJobAdvantages /> */}
                                    {/* <ExternalAdvertAdditionalInfo /> */}
                                </Form>

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

export default ExternalAdvertProfile2;
