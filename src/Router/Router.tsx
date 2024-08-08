import {createBrowserRouter} from "react-router-dom";

import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AuthPage from "@/pages/Auth/AuthPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import AuthLayout from "@/Layouts/AuthLayout";
import MasterProjectPage from "@/pages/MasterProjectPage/MasterProjectPage";
import ProfilePage from "@/pages/ProfilePage/ProfilePage";
import Purchase from "@/pages/Purchase/Purchase";
import Licences from "@/pages/Licences/Licences";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "", element: <HomePage />},
      // {
      //   path: "/create-project",
      //   element: (
      //     <ProtectedRoute
      //       role="creator"
      //       redirectPath="/"
      //       Component={CreateProjectPage}
      //     />
      //   ),
      // },
      {
        path: "/master-project/:projectId",
        element: (
          <ProtectedRoute
            role="both"
            redirectPath="/"
            Component={MasterProjectPage}
          />
        ),
        // children: [{path: "/collection/:collectionId", element: <><}],
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute
            role="both"
            redirectPath="/"
            Component={ProfilePage}
          />
        ),
        // children: [{path: "/collection/:collectionId", element: <><}],
      },
      {
        path: "/purchase",
        element: (
          <ProtectedRoute
            role="creator"
            redirectPath="/purchase"
            Component={Purchase}
          />
        ),
        // children: [{path: "/collection/:collectionId", element: <><}],
      },

      {
        path: "/licenses",
        element: (
          <ProtectedRoute
            role="creator"
            redirectPath="/licenses"
            Component={Licences}
          />
        ),
        // children: [{path: "/collection/:collectionId", element: <><}],
      },
      
    ],
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
