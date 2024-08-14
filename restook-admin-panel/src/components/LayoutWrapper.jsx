import React, { useState } from "react";
import { Layout } from "antd";

import Header from "./Header";
import Footer from "./Footer";
import Sider from "./Sider";

const {
    Header: AntHeader,
    Content: AntContent,
    Footer: AntFooter,
    Sider: AntSider,
} = Layout;

const LayoutWrapper = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <Layout className="main-layout" style={{ minHeight: "100vh" }}>
            <AntSider
                aria-label="Sidebar"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={270}
                collapsedWidth={70}
                trigger={null}
                breakpoint="lg"
                onBreakpoint={(broken) => setCollapsed(broken)}
            >
                <Sider collapsed={collapsed} setCollapsed={setCollapsed} />
            </AntSider>
            <Layout>
                <AntHeader>
                    <Header setCollapsed={setCollapsed} />
                </AntHeader>
                <AntContent className="ant-content">{children}</AntContent>
                <AntFooter>
                    <Footer />
                </AntFooter>
            </Layout>
        </Layout>
    );
};

export default LayoutWrapper;
