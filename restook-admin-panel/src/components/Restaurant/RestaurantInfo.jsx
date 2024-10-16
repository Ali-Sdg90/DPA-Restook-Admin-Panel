import React, { useContext } from "react";
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
        imageName
    } = useContext(ExternalAdvertContext);

    const { setToastifyObj } = useContext(CommonContext);
    const { setUserPlace } = useContext(UserContext);

    const submitForm = async () => {
        console.log("-- SUBMIT --");

        console.log("FORM >>", form.getFieldsValue());
        console.log("mappedData >>", mappedData);

        console.log("- - - - - - - -");

        const mergedObject = mergeObjectFunc(form.getFieldsValue(), mappedData);
        console.log("mergedObject >> ", mergedObject);

        const postObject = convertToPostObj(
            mergedObject,
            profileId,
            mappedData.alreadyExist,
            "onlyRestaurant",
            imageName
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

                console.log("success RES >>", res);

                setUserPlace("restaurant-profile");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("ERROR >>", error);
        }
    };

    // For Testing Form Data
    // const handleFormChange = (changedValues, allValues) => {
    //     console.log("Changed values:", changedValues);
    //     console.log("All form values:", allValues);
    // };

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
                                    // onValuesChange={handleFormChange}
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
