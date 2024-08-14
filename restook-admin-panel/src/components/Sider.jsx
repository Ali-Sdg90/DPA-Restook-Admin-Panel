import React, { useContext, useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { SIDER_ITEMS } from "../constants/menuItems";
import { ReactComponent as MainLogo } from "../assets/images/sider/main-logo.svg";
import { UserContext } from "../store/UserContextProvider";
import { useNavigate, useLocation } from "react-router-dom";

const { Sider: AntSider } = Layout;

const Sider = ({ collapsed, setCollapsed }) => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [activeKey, setActiveKey] = useState("");

    useEffect(() => {
        const activeItem = SIDER_ITEMS.find(
            (item) => item.nav === location.pathname && item.place === userPlace
        );
        
        if (activeItem) {
            setActiveKey(activeItem.key);
        }
    }, [location.pathname, userPlace]);

    const handleMenuClick = (e) => {
        const clickedItem = SIDER_ITEMS.find((item) => item.key === e.key);
        if (clickedItem) {
            if (clickedItem.place) setUserPlace(clickedItem.place);
            if (clickedItem.nav) navigate(clickedItem.nav);
        }
    };

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
                <Menu
                    items={SIDER_ITEMS}
                    theme="light"
                    mode="inline"
                    onClick={handleMenuClick}
                    selectedKeys={[activeKey]}
                />
            </AntSider>
        </Layout>
    );
};

export default Sider;
