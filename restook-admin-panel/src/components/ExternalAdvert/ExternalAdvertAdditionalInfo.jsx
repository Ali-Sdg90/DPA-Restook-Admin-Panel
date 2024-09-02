import React, { useContext } from "react";
import { ExternalAdvertContext } from "../../store/ExternalAdvertContextProvider";
import {
    Card,
    Col,
    Input,
    Row,
    Form,
    Switch,
    Typography,
    Flex,
} from "antd";
import TextArea from "antd/es/input/TextArea";

const { Text } = Typography;

const ExternalAdvertAdditionalInfo = () => {
    const { isSalaryAgreed, handleSalarySwitchChange } = useContext(
        ExternalAdvertContext
    );

    return (
        <Card title="موراد تکمیلی" className="fourth-card">
            <Row>
                <Col span={24}>
                    <Form.Item label="شرح شغلی" name="explanation">
                        <TextArea
                            placeholder=""
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
                                        onChange={handleSalarySwitchChange}
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
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item
                                label="حداکثر حقوق به تومان"
                                name="maxSalary"
                            >
                                <Input placeholder="" />
                            </Form.Item>
                        </Col>
                    </Row>
                ) : (
                    ""
                )}
            </Row>
        </Card>
    );
};

export default ExternalAdvertAdditionalInfo;
