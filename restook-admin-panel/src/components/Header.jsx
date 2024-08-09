import React from "react";
import { Button, ConfigProvider, Dropdown, Flex } from "antd";

import { ReactComponent as DownArrow } from "../assets/images/header/Chevron - Down (1).svg";
import { ReactComponent as Menu } from "../assets/images/header/Menu (1).svg";
import { ReactComponent as Ellipse } from "../assets/images/header/Ellipse 2.svg";
import { SmileOutlined } from "@ant-design/icons";

const Header = ({ setCollapsed }) => {
    const items = [
        {
            key: "1",
            label: "سلام",
            icon: <SmileOutlined />,
        },
        {
            key: "2",
            label: "چطوری؟",
            icon: <SmileOutlined />,
            children: [
                {
                    key: "21",
                    label: "خوبم",
                },
                {
                    key: "22",
                    label: "خوب ترم",
                },
            ],
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
                        <Dropdown
                            menu={{ items }}
                            arrow
                            placement="top"
                            direction={"ltr"}
                        >
                            <Button type="text" icon={<DownArrow />}>
                                علی صادقی
                            </Button>
                        </Dropdown>

                        <Ellipse />
                    </Flex>
                </Flex>
            </ConfigProvider>
        </div>
    );
};

export default Header;
