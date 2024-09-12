import React, { useContext, useState } from "react";
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Modal,
    Row,
    Switch,
    Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { patchRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";

const { Text } = Typography;

const AdvertReviewModal = ({
    isModalOpen,
    setIsModalOpen,
    advertData,
    id,
    setShouldRefetchData,
}) => {
    const [form] = Form.useForm();
    const [isSalaryAgreed, setIsSalaryAgreed] = useState(
        !!!advertData.salaryFormat
    );

    const handleSalarySwitchChange = (checked) => {
        setIsSalaryAgreed(checked);
    };

    const { setToastifyObj } = useContext(CommonContext);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log("Form submitted with values:", values);

            const res = await patchRequest(
                `/advertisements/${id}`,
                values,
                true,
                setToastifyObj
            );

            if (res.success) {
                setToastifyObj(() => ({
                    title: res.message,
                    mode: "success",
                }));

                setShouldRefetchData(true);
            } else {
                console.error("ERROR IN PATCH", res);
            }
        } catch (error) {
            console.log("Validation Failed:", error);
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel} className="close-btn">
                    انصراف
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                    className="submit-btn"
                >
                    ذخیره
                </Button>,
            ]}
            width={"80%"}
            closeIcon={false}
            className="modal-container"
        >
            <Form
                form={form}
                name="restaurant-base-info-form"
                layout="vertical"
                autoComplete="off"
                // onValuesChange={(changedValues, allValues) => {
                //     console.log("Form values changed:", allValues);
                // }} // temp
                initialValues={{
                    explanation: advertData.explanation,
                    salary: isSalaryAgreed,
                    minSalary: advertData.minSalary,
                    maxSalary: advertData.maxSalary,
                }}
            >
                <Row>
                    <Col span={24}>
                        <Form.Item label="شرح شغلی" name="explanation">
                            <TextArea
                                autoSize={{
                                    minRows: 5,
                                    maxRows: 8,
                                }}
                                maxLength={1000}
                                showCount
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24} className="salary-section">
                        <Flex justify="space-between">
                            <div className="right-side">
                                <div className="top-text">حقوق و دستمزد</div>
                                <div className="bottom-text">
                                    حقوق و دستمزد مورد نظرت رو وارد کن
                                </div>
                            </div>

                            <div className="left-side">
                                <Form.Item name="salary">
                                    <Flex justify="space-between">
                                        <Switch
                                            checked={isSalaryAgreed}
                                            onChange={(checked) => {
                                                handleSalarySwitchChange(
                                                    checked
                                                );
                                                form.setFieldsValue({
                                                    salary: !checked,
                                                });
                                            }}
                                        />
                                        <Text>حقوق توافقی</Text>
                                    </Flex>
                                </Form.Item>
                            </div>
                        </Flex>
                    </Col>

                    {!isSalaryAgreed ? (
                        <Row gutter={[20]} className="show-salary-section">
                            <Col span={8}>
                                <Form.Item
                                    label="حداقل حقوق به تومان"
                                    name="minSalary"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item
                                    label="حداکثر حقوق به تومان"
                                    name="maxSalary"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    ) : (
                        ""
                    )}
                </Row>
            </Form>
        </Modal>
    );
};

export default AdvertReviewModal;
