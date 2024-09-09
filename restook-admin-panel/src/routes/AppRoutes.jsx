import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routes } from "../constants/routeConstants";
import { Spin } from "antd";
import LayoutWrapper from "../components/Layout/LayoutWrapper";

const AppRoutes = () => {
    return (
        <div>
            <Suspense
                fallback={
                    window.location.href.includes("/login") ? (
                        <Spin
                            size="large"
                            className="loading-token-spinner full-page-loading"
                        />
                    ) : (
                        <LayoutWrapper>
                            <Spin
                                size="large"
                                className="loading-token-spinner"
                            />
                        </LayoutWrapper>
                    )
                }
            >
                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                route.needWrapper ? (
                                    <LayoutWrapper>
                                        {route.element}
                                    </LayoutWrapper>
                                ) : (
                                    route.element
                                )
                            }
                        />
                    ))}
                </Routes>
            </Suspense>
        </div>
    );
};

export default AppRoutes;
