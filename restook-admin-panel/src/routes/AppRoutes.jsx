import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { routes } from "../constants/routeConstants";
import LayoutWrapper from "../components/LayoutWrapper";

const AppRoutes = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
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
