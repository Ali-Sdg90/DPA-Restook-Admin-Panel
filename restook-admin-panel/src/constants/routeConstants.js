import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import RestaurantsList from "../pages/RestaurantsList";
import RestaurantProfile from "../pages/RestaurantProfile";

const Login = lazy(() => import("../pages/Login"));
const HomePage = lazy(() => import("../pages/HomePage"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

export const routes = [
    { path: "/login", element: <Login />, needWrapper: false },
    { path: "/home-page", element: <HomePage />, needWrapper: true },
    { path: "/restaurants-list", element: <RestaurantsList />, needWrapper: true },
    { path: "/restaurant-profile/:id", element: <RestaurantProfile />, needWrapper: true },
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/page-not-found", element: <PageNotFound /> },
    { path: "*", element: <Navigate to="/page-not-found" replace /> },
];
