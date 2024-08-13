import { Card, Col, Flex, Row } from "antd";
import React from "react";

import { ReactComponent as Cutlery } from "../assets/images/quick-access/cutlery 2 (1).svg";
import { ReactComponent as Note } from "../assets/images/quick-access/Note - Text (2).svg";
import { ReactComponent as Hat } from "../assets/images/quick-access/chef's hat (1).svg";
import { ReactComponent as Arrow } from "../assets/images/quick-access/Chevron - Left.svg";

const QuickAccess = () => {
    return (
        <Col span={24} className="quick-access-section">
            <Card title="دسترسی سریع">
                <Row gutter={[23, 23]}>
                    <Col lg={8} md={12} sm={24} xs={24}>
                        <Card className="quick-access-1 quick-access-btns">
                            <Row>
                                <Col span={5}>
                                    <Flex justify="center" align="center">
                                        <Cutlery />
                                    </Flex>
                                </Col>

                                <Col span={17}>
                                    <Flex vertical>
                                        <div className="btn-title">
                                            مجموعه‌های جدید
                                        </div>
                                        <div className="btn-amount">
                                            18 مجموعه جدید
                                        </div>
                                    </Flex>
                                </Col>

                                <Col span={2}>
                                    <Flex justify="center" align="center">
                                        <Arrow />
                                    </Flex>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col lg={8} md={12} sm={24} xs={24}>
                        <Card className="quick-access-2 quick-access-btns">
                            <Row>
                                <Col span={5}>
                                    <Flex justify="center" align="center">
                                        <Note />
                                    </Flex>
                                </Col>

                                <Col span={17}>
                                    <Flex vertical>
                                        <div className="btn-title">
                                            آگهی‌های جدید
                                        </div>
                                        <div className="btn-amount">
                                            5 آگهی جدید
                                        </div>
                                    </Flex>
                                </Col>

                                <Col span={2}>
                                    <Flex justify="center" align="center">
                                        <Arrow />
                                    </Flex>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col lg={8} md={12} sm={24} xs={24}>
                        <Card className="quick-access-3 quick-access-btns">
                            <Row>
                                <Col span={5}>
                                    <Flex justify="center" align="center">
                                        <Hat />
                                    </Flex>
                                </Col>

                                <Col span={17}>
                                    <Flex vertical>
                                        <div className="btn-title">
                                            کارجوهای جدید
                                        </div>
                                        <div className="btn-amount">
                                            7 کارجوی جدید
                                        </div>
                                    </Flex>
                                </Col>

                                <Col span={2}>
                                    <Flex justify="center" align="center">
                                        <Arrow />
                                    </Flex>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </Col>
    );
};

export default QuickAccess;
