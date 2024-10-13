import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "antd";

import { ReactComponent as RestookLogo } from "../assets/images/login-page/Restook Logo.svg";

import { UserContext } from "../store/UserContextProvider";
import Login from "../components/Login/Login";
import ForgetPass from "../components/Login/ForgetPass";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContextProvider";
import { postRequest } from "../services/apiService";
import { CommonContext } from "../store/CommonContextProvider";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        phoneNumber: "", // "09039618464"
        password: "", // "123456789"
    });
    const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);

    const { setToastifyObj, setLocalToken } = useContext(CommonContext);
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { setUserData } = useContext(AuthContext);

    const navigate = useNavigate();

    const checkLoginValidation = async (endpoint, data) => {
        try {
            const res = await postRequest(
                endpoint,
                data,
                false,
                setToastifyObj
            );

            setIsSubmitBtnLoading(false);

            if (res.success && res.data) {
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

                setUserPlace("home-page");
                navigate("/home-page");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("ERROR >>", error);

            let title = "شماره تلفن یا رمز اشتباه است";

            if (endpoint === "/auth/verifyCode") {
                title = "کد تایید اشتباه است";
            }

            setIsSubmitBtnLoading(false);

            setToastifyObj(() => ({
                title: title,
                mode: "error",
            }));
        }
    };

    const pageMode = () => {
        switch (userPlace) {
            case "default":
            case "login-page":
                return (
                    <Login
                        checkLoginValidation={checkLoginValidation}
                        formData={formData}
                        setFormData={setFormData}
                        isSubmitBtnLoading={isSubmitBtnLoading}
                        setIsSubmitBtnLoading={setIsSubmitBtnLoading}
                    />
                );
            case "forget-pass":
                return (
                    <ForgetPass
                        checkLoginValidation={checkLoginValidation}
                        formData={formData}
                        isSubmitBtnLoading={isSubmitBtnLoading}
                        setIsSubmitBtnLoading={setIsSubmitBtnLoading}
                    />
                );
            default:
                console.log("ERROR IN LoginPage-pageMode", userPlace);
                setUserPlace("login-page");
        }
    };

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("login-page");
        }
    }, [userPlace, setUserPlace]);

    return (
        <div className="login-page">
            <Row className="loginSection">
                <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    md={{ span: 13, order: 1 }}
                    className="rightSide"
                >
                    {pageMode()}
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

export default LoginPage;
