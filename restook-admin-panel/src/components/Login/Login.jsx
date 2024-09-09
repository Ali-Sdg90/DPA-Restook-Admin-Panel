import React, { useContext, useState } from "react";
import { Button, Flex, Form, Input } from "antd";

import { ReactComponent as UserNameIcon } from "../../assets/images/login-page/User.svg";
import { ReactComponent as PasswordIcon } from "../../assets/images/login-page/Lock.svg";

import { postRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";
import { UserContext } from "../../store/UserContextProvider";

const Login = ({
    formData,
    setFormData,
    checkLoginValidation,
    isSubmitBtnLoading,
    setIsSubmitBtnLoading,
}) => {
    const [isForgetBtnLoading, setIsForgetBtnLoading] = useState(false);

    const { setToastifyObj } = useContext(CommonContext);
    const { setUserPlace } = useContext(UserContext);

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

        if (!formData.phoneNumber || !formData.phoneNumber.length) {
            setIsForgetBtnLoading(false);
            setToastifyObj({
                title: "لطفا شماره تلفن را وارد کنید",
                mode: "error",
            });
            return;
        }

        if (!regex.test(formData.phoneNumber)) {
            setIsForgetBtnLoading(false);
            setToastifyObj({
                title: "لطفا شماره تلفن را درست وارد کنید",
                mode: "error",
            });
            return;
        }

        try {
            const res = await postRequest(
                "/auth/forgetPass",
                { phoneNumber: formData.phoneNumber },
                false,
                setToastifyObj
            );

            setIsForgetBtnLoading(false);
            console.log("res", res);

            if (res?.response?.data?.message) {
                setToastifyObj({
                    title: res.response.data.message,
                    mode: "error",
                });
            } else {
                setUserPlace("forget-pass");
            }
        } catch (error) {
            setIsForgetBtnLoading(false);
            setToastifyObj({
                title: error.response.data.message,
                mode: "error",
            });
        }
    };

    return (
        <div className="login-mode">
            <div className="sectionHeader">ورود</div>

            <Form
                name="login"
                initialValues={{
                    remember: true,
                }}
                onFinish={loginFormSubmit}
            >
                <Form.Item
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                            message: "لطفا شماره تلفن خود را وارد کنید",
                        },
                    ]}
                >
                    <Input
                        value={formData.phoneNumber}
                        onChange={(e) => inputChangeHandler(e)}
                        suffix={<UserNameIcon />}
                        name="phoneNumber"
                        autoComplete="current-password"
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
                        autoComplete="current-password"
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
    );
};

export default Login;
