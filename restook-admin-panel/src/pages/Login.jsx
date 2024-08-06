import React from "react";

import { Button, Col, Flex, Form, Input, Row } from "antd";

import { ReactComponent as UserNameIcon } from "../assets/images/login/User.svg";
import { ReactComponent as PasswordIcon } from "../assets/images/login/Lock.svg";
import { ReactComponent as RestookLogo } from "../assets/images/login/Restook Logo.svg";

const Login = () => {
    return (
        <div className="login-page">
            <Row className="loginSection">
                <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    md={{ span: 12, order: 1 }}
                    className="rightSide"
                >
                    <div className="sectionHeader">ورود</div>
                    <Form
                        name="login"
                        initialValues={{
                            remember: true,
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "لطفا شماره تماس خود را وارد کنید",
                                },
                            ]}
                        >
                            <Input suffix={<UserNameIcon />} />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "لطفا رمز خود را وارد کنید",
                                },
                            ]}
                        >
                            <Input type="password" suffix={<PasswordIcon />} />
                        </Form.Item>

                        <Form.Item />

                        <Form.Item>
                            <Flex justify="space-between">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="submit-btn"
                                >
                                    ورود
                                </Button>
                                <Button type="link" className="forget-pass">
                                    رمز عبور خود را فراموش کرده‌اید؟
                                </Button>
                            </Flex>
                        </Form.Item>
                    </Form>
                </Col>

                <Col
                    xs={{ span: 24, order: 1 }}
                    sm={{ span: 24, order: 1 }}
                    md={{ span: 12, order: 2 }}
                    className="leftSide"
                >
                    <RestookLogo />
                </Col>
            </Row>
        </div>
    );
};

export default Login;
