import React from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import StoreProvider from "./store/StoreProvider";
import ConfigProviderWrapper from "./config/ConfigProviderWrapper";

const App = () => {
    return (
        <HashRouter>
            <StoreProvider>
                <ConfigProviderWrapper>
                    <AppRoutes />
                </ConfigProviderWrapper>
            </StoreProvider>
        </HashRouter>
    );
};

export default App;
