import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const HomePage = lazy(() => import("../pages/HomePage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const UsersList = lazy(() => import("../pages/UsersList"));
const AdvertList = lazy(() => import("../pages/AdvertList"));
const UserProfile = lazy(() => import("../pages/UserProfile"));
const AdvertReview = lazy(() => import("../pages/AdvertReview"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const ExternalAdvert = lazy(() => import("../pages/ExternalAdvert"));
const RestaurantsPage = lazy(() => import("../pages/RestaurantsPage"));
const RestaurantProfile = lazy(() => import("../pages/RestaurantProfile"));
const TransactionsListPage = lazy(() => import("../pages/TransactionsListPage"));

export const routes = [
    { path: "/login", element: <LoginPage />, needWrapper: false },
    { path: "/home-page", element: <HomePage />, needWrapper: true },
    { path: "/restaurants-list", element: <RestaurantsPage />, needWrapper: true },
    { path: "/restaurant-profile/:id", element: <RestaurantProfile />, needWrapper: true },
    { path: "/advertisements-list", element: <AdvertList />, needWrapper: true },
    { path: "/advertisement-review/:id", element: <AdvertReview />, needWrapper: true },
    { path: "/users-list", element: <UsersList />, needWrapper: true },
    { path: "/user-profile/:id", element: <UserProfile />, needWrapper: true },
    { path: "/resume-user-profile/:restaurantId/:urlId/:id", element: <UserProfile />, needWrapper: true },
    { path: "/external-advert", element: <ExternalAdvert />, needWrapper: true },
    { path: "/transaction-list", element: <TransactionsListPage />, needWrapper: true },
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/page-not-found", element: <PageNotFound /> },
    { path: "*", element: <Navigate to="/page-not-found" replace /> },
];
