import React, { useContext, useState } from "react";
import { Button, Col, Flex, Form, Input, Row } from "antd";
import { ReactComponent as UserNameIcon } from "../assets/images/login/User.svg";
import { ReactComponent as PasswordIcon } from "../assets/images/login/Lock.svg";
import { ReactComponent as RestookLogo } from "../assets/images/login/Restook Logo.svg";
import { login } from "../services/apiService";
import { AuthContext } from "../store/AuthContextProvider";
import { CommonContext } from "../store/CommonContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        phoneNumber: "",
        password: "",
    });

    const { setUserData } = useContext(AuthContext);
    const { setToastifyObj } = useContext(CommonContext);

    const navigate = useNavigate();

    const formSubmit = async () => {
        try {
            console.log("formData >>", formData);

            const res = await login(formData);

            if (res.success) {
                console.log("login_data >>", res.data);

                setUserData(() => ({
                    access_token: res.data.access_token,
                    user: res.data.user,
                }));

                setToastifyObj(() => ({
                    title: `سلام ${res.data.user.firstName} خیلی خوش اومدی!`,
                    mode: "success",
                }));

                navigate("/home-page");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("ERROR in formSubmit >>", error);

            setToastifyObj(() => ({
                title: "شماره تلفن یا رمز اشتباه است",
                mode: "error",
            }));
        }
    };

    const inputChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

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
                        onFinish={formSubmit}
                        autoComplete="off"
                    >
                        <Form.Item
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "لطفا شماره تماس خود را وارد کنید",
                                },
                            ]}
                        >
                            <Input
                                value={formData.phoneNumber}
                                onChange={(e) => inputChangeHandler(e)}
                                suffix={<UserNameIcon />}
                                name="phoneNumber"
                            />
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
                            <Input
                                type="password"
                                suffix={<PasswordIcon />}
                                value={formData.password}
                                onChange={(e) => inputChangeHandler(e)}
                                name="password"
                            />
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
