import React from "react";
import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import PostList from "../pages/PostList";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoutes from "../components/PrivateRoutes";
import UserPage from "../pages/UserPage";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <PrivateRoutes />,
            children: [
                {
                    path: "",
                    element: <Navigate to={`/dashboard`} replace={true} />
                },
                {
                    path: "dashboard",
                    element: <Dashboard />,
                    children: [
                        {
                            path: "",
                            element: <PostList />
                        },
                        {
                            path: "profile",
                            element: <UserPage />
                        }
                    ]
                }
            ],
        },
        {
            path: "login",
            element: <LoginPage />,
        },
        {
            path: "register",
            element: <RegisterPage />
        },
        {
            path: "*",
            element: <Navigate to={`/dashboard`} replace={true} />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
