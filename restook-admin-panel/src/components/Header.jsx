import React, { useContext, useEffect, useState } from "react";
import { Button, ConfigProvider, Dropdown, Flex } from "antd";

import { ReactComponent as DownArrow } from "../assets/images/header/Chevron - Down (1).svg";
import { ReactComponent as Menu } from "../assets/images/header/Menu (1).svg";
import { ReactComponent as Ellipse } from "../assets/images/header/Ellipse 2.svg";
import { LogoutOutlined } from "@ant-design/icons";
import { AuthContext } from "../store/AuthContextProvider";
import ImageWithFallback from "./ImageWithFallback";
import { useNavigate } from "react-router-dom";
import { CommonContext } from "../store/CommonContextProvider";
import { UserContext } from "../store/UserContextProvider";

const Header = ({ setCollapsed }) => {
    const { userData, setUserData } = useContext(AuthContext);
    const { setLocalToken } = useContext(CommonContext);
    const { setUserPlace } = useContext(UserContext);

    const [userName, setUserName] = useState("");
    const [userImg, setUserImg] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (
            userData.user &&
            userData.user.firstName &&
            userData.user.lastName
        ) {
            setUserName(
                () => userData.user.firstName + " " + userData.user.lastName
            );
        }

        if (userData.user && userData.user.imageUrl) {
            setUserImg(userData.user.imageUrl);
        }
    }, [userData]);

    const logoutHandler = () => {
        setLocalToken("");
        setUserData({});
        setUserPlace("/login");
        navigate("/login");
    };

    const items = [
        {
            key: "1",
            label: "خروج از حساب کاربری",
            icon: <LogoutOutlined />,
            onClick: logoutHandler,
        },
    ];

    const menuClickHandler = () => {
        setCollapsed((prevState) => !prevState);
    };

    return (
        <div className="header-container">
            <ConfigProvider direction={"ltr"}>
                <Flex align="center" justify="space-between">
                    <Button onClick={menuClickHandler} type="text">
                        <Menu />
                    </Button>

                    <Flex align="center" className="left-section">
                        <ConfigProvider direction={"rtl"}>
                            <Dropdown
                                menu={{ items }}
                                arrow
                                placement="top"
                                direction={"ltr"}
                            >
                                <Button type="text" icon={<DownArrow />}>
                                    {userName}
                                </Button>
                            </Dropdown>
                        </ConfigProvider>
                        {userImg ? (
                            <ImageWithFallback
                                imageUrl={userImg}
                                className={"profile-image"}
                                alt={"profile-image"}
                            />
                        ) : (
                            <Ellipse />
                        )}
                    </Flex>
                </Flex>
            </ConfigProvider>
        </div>
    );
};

export default Header;
