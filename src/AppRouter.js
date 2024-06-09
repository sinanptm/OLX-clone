import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth } from './Store/AuthContext';
import { Spinner } from "./assets/Spinner";


const Login = lazy(() => import("./Pages/Login"));
const ViewPost = lazy(() => import("./Pages/ViewPost"));
const Home = lazy(() => import("./Pages/Home"));
const Signup = lazy(() => import("./Pages/Signup"));
const Create = lazy(() => import("./Pages/Create"));

const AppRouter = () => {
  const { user, loading } = useAuth();


  if (loading) {
    return <Spinner />
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
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
