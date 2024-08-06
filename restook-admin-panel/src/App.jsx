import React from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import StoreProvider from "./store/StoreProvider";
import ConfigProviderWrapper from "./config/ConfigProviderWrapper";
import Toastify from "./components/Toastify";

const App = () => {
    return (
        <HashRouter>
            <StoreProvider>
                <ConfigProviderWrapper>
                    <Toastify />
                    <AppRoutes />
                </ConfigProviderWrapper>
            </StoreProvider>
        </HashRouter>
    );
};

export default App;
