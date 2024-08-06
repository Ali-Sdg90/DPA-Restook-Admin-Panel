import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

const ConfigProviderWrapper = ({ children }) => {
    const { defaultAlgorithm } = antdTheme;

    const theme = {
        algorithm: defaultAlgorithm,

        token: {
            fontFamily:
                'IRANYekanFN, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        },
    };

    return (
        <ConfigProvider direction={"rtl"} theme={theme}>
            {children}
        </ConfigProvider>
    );
};

export default ConfigProviderWrapper;
