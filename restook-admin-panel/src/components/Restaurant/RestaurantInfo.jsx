import React, { useContext, useEffect } from "react";
import { Row, Col, Spin, Form, Flex, Button } from "antd";
import ExternalAdvertFirstCard from "../ExternalAdvert/ExternalAdvertFirstCard";
import { ExternalAdvertContext } from "../../store/ExternalAdvertContextProvider";
import { patchRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";
import { mergeObjectFunc } from "../../utils/mergeObjectFuncExternalAdvert";
import { convertToPostObj } from "../../utils/convertToPostObjExternalAdvert";
import { ReactComponent as Edit } from "../../assets/images/restaurants-page/Edit.svg";
import { UserContext } from "../../store/UserContextProvider";

const RestaurantInfo = () => {
    const {
        isAllDataFetched = false,
        form,
        mappedData,
        profileId,
    } = useContext(ExternalAdvertContext);

    const { setToastifyObj } = useContext(CommonContext);
    const { userPlace, setUserPlace } = useContext(UserContext);

    const submitForm = async () => {
        console.log("-- SUBMIT --");

        console.log("FORM >>", form.getFieldsValue());
        console.log("mappedData >>", mappedData);

        console.log("- - - - - - - -");

        const mergedObject = mergeObjectFunc(mappedData, form.getFieldsValue());
        console.log("mergedObject >> ", mergedObject);

        const postObject = convertToPostObj(
            mergedObject,
            profileId,
            mappedData.alreadyExist,
            "onlyRestaurant"
        );
        console.log("postObject >>", postObject);

        try {
            const res = await patchRequest(
                `/restaurants/${profileId}`,
                postObject,
                true,
                setToastifyObj
            );

            if (res.success) {
                setToastifyObj(() => ({
                    title: `ثبت اطلاعات با موفقیت انجام شد`,
                    mode: "success",
                }));

                console.log(res);

                setUserPlace("restaurant-profile");
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
                                    <ExternalAdvertFirstCard
                                        usePrefixForImage={true}
                                        forceFalseAlreadyExist={false}
                                    />
                                </Form>

                                <Flex justify="flex-end">
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="submit-btn"
                                            onClick={() => submitForm()}
                                        >
                                            <Edit />
                                            ویرایش
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

export default RestaurantInfo;