import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const HomePage = lazy(() => import("../pages/HomePage"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export const routes = [
    { path: "/login", element: <Login /> },
    { path: "/home-page", element: <HomePage /> },
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/page-not-found", element: <PageNotFound /> },
    { path: "*", element: <Navigate to="/page-not-found" replace /> },
];
