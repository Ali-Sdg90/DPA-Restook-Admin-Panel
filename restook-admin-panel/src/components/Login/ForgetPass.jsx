import React, { useContext, useEffect, useState } from "react";
import { Button, ConfigProvider, Flex, Form, Input } from "antd";

import { postRequest } from "../../services/apiService";
import { CommonContext } from "../../store/CommonContextProvider";
import { formatTime } from "../../utils/formatTime";
import { convertFAtoEN } from "../../utils/convertFAtoENNumbers";

const ForgetPass = ({
    formData,
    checkLoginValidation,
    isSubmitBtnLoading,
    setIsSubmitBtnLoading,
}) => {
    const [OTPCode, setOTPcode] = useState("");
    const [isForgetFormSubmit, setIsForgetFormSubmit] = useState(false);
    const [sendAgainCounter, setSendAgainCounter] = useState(0);

    const { setToastifyObj } = useContext(CommonContext);

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

        postRequest(
            "/auth/forgetPass",
            {
                phoneNumber: formData.phoneNumber,
            },
            false,
            setToastifyObj
        );
    };

    return (
        <div className="forgot-pass-mode">
            <div className="confirmHeader">کد تأیید</div>

            <Form
                name="forgot-pass"
                initialValues={{
                    remember: true,
                }}
                onFinish={forgetFormSubmit}
                autoComplete="current-password"
                layout="vertical"
                requiredMark={false}
            >
                <Form.Item
                    name="otpCode"
                    label={`کد 5 رقمی ارسال شده به ${formData.phoneNumber} را وارد کنید`}
                    help={
                        OTPCode.length !== 5 && isForgetFormSubmit
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
                                        {formatTime(sendAgainCounter)}
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
    );
};

export default ForgetPass;
