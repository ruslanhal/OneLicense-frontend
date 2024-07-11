import {createBrowserRouter} from "react-router-dom";

import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthPage from "@/pages/Auth/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import AuthLayout from "@/Layouts/AuthLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{path: "", element: <HomePage />}],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {path: "", element: <AuthPage />},
      {path: "login", element: <LoginPage />},
      {path: "signup", element: <SignupPage />},
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
