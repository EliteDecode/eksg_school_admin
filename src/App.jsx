import {
  BrowserRouter,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/auth/Login";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";

import Page404 from "./pages/notFound/Page404";

import StudentsPage from "./pages/dashboard/StudentsPage";
import ResultsPage from "./pages/dashboard/ResultsPage";
import SingleStudentPage from "./pages/dashboard/SingleStudentPage";
import { useSelector } from "react-redux";
import RegisterStudents from "./pages/dashboard/RegisterStudents";
import { Cloudinary } from "@cloudinary/url-gen";
import EditStudents from "./pages/dashboard/EditStudents";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSyncGlobalContext } from "./lib/Context";
import Broadsheet from "./pages/broadsheet/Broadsheet";

// routes

export default function App() {
  const { user } = useSelector((state) => state.schoolAuth);

  window.addEventListener("DOMContentLoaded", () => console.log("hello"));
  window.addEventListener("offline", () =>
    setSyncingText("Offline mode, no network currently detected")
  );

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    {
      element: user ? <DashboardLayout /> : <Navigate to="/login" />,

      path: "/dashboard",
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        {
          path: "home",
          element: <DashboardHomePage />,
        },
        {
          path: "students",
          element: <StudentsPage />,
        },
        {
          path: "register",
          element: <RegisterStudents />,
        },
        {
          path: "edit-student/:studentId",
          element: <EditStudents />,
        },

        {
          path: "results",
          element: <ResultsPage />,
        },

        {
          path: "students/:studentId",
          element: <SingleStudentPage />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/broadsheet",
      element: <Broadsheet />,
    },
    { path: "/404", element: <Page404 /> },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
  return <RouterProvider router={routes} />;
}
