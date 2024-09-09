import React from "react";
import ReactDOM from "react-dom/client";
import "../src/assets/scss/index.scss";
import "jalaali-react-date-picker/lib/styles/index.css";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
