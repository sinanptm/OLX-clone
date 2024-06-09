import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth } from './Store/AuthContext';
import { BeatLoader } from "react-spinners";

const Login = lazy(() => import("./Pages/Login"));
const ViewPost = lazy(() => import("./Pages/ViewPost"));
const Home = lazy(() => import("./Pages/Home"));
const Signup = lazy(() => import("./Pages/Signup"));
const Create = lazy(() => import("./Pages/Create"));

const AppRouter = () => {
  const { user, loading } = useAuth();

  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  };

  if (loading) {
    return (
      <div style={spinnerStyle}>
        <BeatLoader size={15} color={"#123abc"} />
      </div>
    );
  }

  const router = createBrowserRouter([
    { path: "/login", element: user ? <Navigate to="/home" /> : <Login /> },
    { path: "/signup", element: user ? <Navigate to="/home" /> : <Signup /> },
    { path: "/create", element: user ? <Create /> : <Navigate to="/login" /> },
    { path: "/home", element: <Home /> },    
    { path: "/viewpost/:id", element: <ViewPost /> },
    { path: "/", element: <Home /> },
  ]);

  return (
    <Suspense fallback={
      <div style={spinnerStyle}>
        <BeatLoader size={15} color={"#123abc"} />
      </div>
    }>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
