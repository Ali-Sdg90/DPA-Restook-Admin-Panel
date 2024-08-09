import React from "react";
import { Layout, Menu } from "antd";

import { SIDER_ITEMS } from "../constants/menuItems";

import { ReactComponent as MainLogo } from "../assets/images/sider/main-logo.svg";

const { Sider: AntSider } = Layout;

const Sider = ({ collapsed, setCollapsed }) => {
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
