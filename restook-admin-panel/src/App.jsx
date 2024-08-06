import React from "react";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import StoreProvider from "./store/StoreProvider";

const App = () => {
    return (
        <HashRouter>
            <StoreProvider>
                <AppRoutes />
            </StoreProvider>
        </HashRouter>
    );
};

export default App;
