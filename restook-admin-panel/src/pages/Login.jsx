import React, { useContext, useEffect, useState } from "react";
import { Button, Col, ConfigProvider, Flex, Form, Input, Row } from "antd";
import { ReactComponent as UserNameIcon } from "../assets/images/login/User.svg";
import { ReactComponent as PasswordIcon } from "../assets/images/login/Lock.svg";
import { ReactComponent as RestookLogo } from "../assets/images/login/Restook Logo.svg";
import { postRequest } from "../services/apiService";
import { AuthContext } from "../store/AuthContextProvider";
import { CommonContext } from "../store/CommonContextProvider";
import { useNavigate } from "react-router-dom";
import { formatTime } from "../utils/formatTime";
import { convertFAtoEN } from "../utils/convertFAtoENNumbers";

const Login = () => {
    const [formData, setFormData] = useState({
        phoneNumber: "09039618464", // Temp "09039618464"
        password: "123456789", // Temp "123456789"
    });
    const [pageLoginMode, setPageLoginMode] = useState(true);
    const [OTPCode, setOTPcode] = useState("");
    const [isForgetFormSubmit, setIsForgetFormSubmit] = useState(false);
    const [sendAgainCounter, setSendAgainCounter] = useState(0);
    const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);
    const [isForgetBtnLoading, setIsForgetBtnLoading] = useState(false);

    const { setUserData } = useContext(AuthContext);
    const { setToastifyObj, setLocalToken } = useContext(CommonContext);

    const navigate = useNavigate();

    const checkLoginValidation = async (endpoint, data) => {
        try {
            const res = await postRequest(endpoint, data, false);

            setIsSubmitBtnLoading(false);

            if (res.success) {
                console.log("login_data >>", res.data);

                setUserData(() => ({
                    access_token: res.data.access_token,
                    user: res.data.user,
                }));

                setLocalToken(res.data.access_token);

                setToastifyObj(() => ({
                    title: `سلام ${res.data.user.firstName} خوش اومدی!`,
                    mode: "success",
                }));

                navigate("/home-page");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("ERROR >>", error);

            let title = "شماره تلفن یا رمز اشتباه است";

            if (endpoint === "/auth/verifyCode") {
                title = "کد تایید اشتباه است";

                setOTPcode("");
            }

            setToastifyObj(() => ({
                title: title,
                mode: "error",
            }));
        }
    };

    const loginFormSubmit = async () => {
        console.log("formData >>", formData);
        setIsSubmitBtnLoading(true);

        checkLoginValidation("/auth/login", formData);
    };

    const inputChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: convertFAtoEN(e.target.value),
        }));
    };

    const forgetPassBtn = async () => {
        setIsForgetBtnLoading(true);
        const regex = /^\d{11}$/;

        if (!!!formData.phoneNumber.length) {
            setIsForgetBtnLoading(false);

            setToastifyObj(() => ({
                title: "لطفا شماره تلفن را وارد کنید",
                mode: "error",
            }));
        } else {
            if (regex.test(formData.phoneNumber)) {
                const res = await postRequest(
                    "/auth/forgetPass",
                    {
                        phoneNumber: formData.phoneNumber,
                    },
                    false
                );

                setIsForgetBtnLoading(false);
                console.log("res", res);

                if (
                    res &&
                    res.response &&
                    res.response.data &&
                    res.response.data.message
                ) {
                    setToastifyObj(() => ({
                        title: res.response.data.message,
                        mode: "error",
                    }));
                } else {
                    setPageLoginMode(false);
                }
            } else {
                setIsForgetBtnLoading(false);

                setToastifyObj(() => ({
                    title: "لطفا شماره تلفن را درست وارد کنید",
                    mode: "error",
                }));
            }
        }
    };

    const onChange = (text) => {
        setOTPcode(convertFAtoEN(text));

        console.log("OTPCode >>", OTPCode);
    };

    const sharedProps = {
        onChange,
    };

    const forgetFormSubmit = async () => {
        setIsForgetFormSubmit(true);

        if (OTPCode) {
            setIsSubmitBtnLoading(true);

            const sendData = {
                phoneNumber: formData.phoneNumber,
                code: OTPCode,
            };

            console.log("sendData >>", sendData);

            checkLoginValidation("/auth/verifyCode", sendData);
        }
    };

    useEffect(() => {
        if (OTPCode) {
            forgetFormSubmit();
        }
    }, [OTPCode]);

    useEffect(() => {
        let interval;
        if (sendAgainCounter > 0) {
            interval = setInterval(() => {
                setSendAgainCounter((prevCounter) => {
                    if (prevCounter > 0) {
                        return prevCounter - 1;
                    } else {
                        clearInterval(interval);
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [sendAgainCounter]);

    const sendAgainHandler = () => {
        setSendAgainCounter(120); // 10

        // Send Code
        postRequest(
            "/auth/forgetPass",
            {
                phoneNumber: formData.phoneNumber,
            },
            false
        );
    };

    return (
        <div className="login-page">
            <Row className="loginSection">
                <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    md={{ span: 13, order: 1 }}
                    className="rightSide"
                >
                    {pageLoginMode ? (
                        <div className="login-mode">
                            <div className="sectionHeader">ورود</div>
                            <Form
                                name="login"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={loginFormSubmit}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "لطفا شماره تلفن خود را وارد کنید",
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
                                            message:
                                                "لطفا رمز خود را وارد کنید",
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
                                    <Flex justify="space-between" gap={10}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="submit-btn"
                                            loading={isSubmitBtnLoading}
                                        >
                                            ورود
                                        </Button>
                                        <Button
                                            type="link"
                                            className="forget-pass"
                                            onClick={forgetPassBtn}
                                            loading={isForgetBtnLoading}
                                        >
                                            رمز عبور خود را فراموش کرده‌اید؟
                                        </Button>
                                    </Flex>
                                </Form.Item>
                            </Form>
                        </div>
                    ) : (
                        <div className="forgot-pass-mode">
                            <div className="confirmHeader">کد تأیید</div>

                            <Form
                                name="forgot-pass"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={forgetFormSubmit}
                                autoComplete="off"
                                layout="vertical"
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="otpCode"
                                    label={`کد 5 رقمی ارسال شده به ${formData.phoneNumber} را وارد کنید`}
                                    help={
                                        OTPCode.length !== 5 &&
                                        isForgetFormSubmit
                                            ? "لطفا کد ارسال شده را وارد کنید"
                                            : ""
                                    }
                                >
                                    <ConfigProvider direction="ltr">
                                        <Input.OTP
                                            dir="ltr"
                                            length={5}
                                            {...sharedProps}
                                            size="large"
                                            value={OTPCode}
                                        />
                                    </ConfigProvider>
                                </Form.Item>

                                <Form.Item>
                                    <Flex justify="space-between" gap={10}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="submit-btn"
                                            loading={isSubmitBtnLoading}
                                        >
                                            تأیید
                                        </Button>
                                        <Button
                                            type="link"
                                            className="forget-pass"
                                            onClick={sendAgainHandler}
                                            disabled={sendAgainCounter}
                                        >
                                            {sendAgainCounter ? (
                                                <>
                                                    دریافت مجدد کد در
                                                    <span className="time-span">
                                                        {formatTime(
                                                            sendAgainCounter
                                                        )}
                                                    </span>
                                                    دیگر
                                                </>
                                            ) : (
                                                "دریافت مجدد کد"
                                            )}
                                        </Button>
                                    </Flex>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </Col>

                <Col
                    xs={{ span: 24, order: 1 }}
                    sm={{ span: 24, order: 1 }}
                    md={{ span: 11, order: 2 }}
                    className="leftSide"
                >
                    <RestookLogo />
                </Col>
            </Row>
        </div>
    );
};

export default Login;
