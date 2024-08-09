import React, { useContext, useEffect } from "react";
import { Layout, Menu } from "antd";

import { SIDER_ITEMS } from "../constants/menuItems";

import { ReactComponent as MainLogo } from "../assets/images/sider/main-logo.svg";
import { UserContext } from "../store/UserContextProvider";

const { Sider: AntSider } = Layout;

const Sider = ({ collapsed, setCollapsed }) => {
    const { userPlace } = useContext(UserContext);

    useEffect(() => {
        console.log("userPlace >>", userPlace);
    }, [userPlace]);

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <AntSider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                width={270}
                collapsedWidth={70}
                trigger={null}
            >
                <div className="admin-panel">
                    <MainLogo className="admin-panel-icon" />
                    <div>پنل مدیریت</div>
                </div>
                <Menu items={SIDER_ITEMS} theme="light" mode="inline" />
            </AntSider>
        </Layout>
    );
};

export default Sider;
