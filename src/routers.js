import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Login = lazy(() => import("./Pages/Login"));
const ViewPost = lazy(() => import("./Pages/ViewPost"));
const Home = lazy(() => import("./Pages/Home"));
const Signup = lazy(() => import("./Pages/Signup"));

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/viewpost", element: <ViewPost /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

const Loading = () => <div className="spinner">Loading...</div>;

const Router = () => {
  return (
    <Suspense fallback={<h1>{Loading}</h1>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
