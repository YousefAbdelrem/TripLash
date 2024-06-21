// routes.tsx
import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../components/Authentication/Login";
import SignIn from "../components/Authentication/SignIn";
import OTPVerification from "../components/Authentication/OTPVerification";
import ChangePassword from "../components/Authentication/ChangePassword";
import ForgetPassword from "../components/Authentication/ForgetPassword";
import FavouriteLists from "../components/Nav Bar/FavouriteLists";
import AdminProtectedRoute from "../components/Admin Dashboard/AdminProtectedRoute";
import AdminDashboard from "../components/Admin Dashboard/AdminDashboard";
import Home from "../components/Main/Home";
import App from "../App";
import { AuthProvider } from "../components/Authentication/AuthContext";
import PrivateRoute from "../components/Nav Bar/PrivateRoute";
import TourGuideApplications from "../components/Admin Dashboard/TourGuideApplications";
import UserList from "../components/Admin Dashboard/UserList";
import TourGuideList from "../components/Admin Dashboard/TourGuideList";
import FavouriteList from "../components/Admin Dashboard/FavouriteList";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        {" "}
        <App />
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/Login", element: <Login /> },
      { path: "/SignIn", element: <SignIn /> },
      { path: "/ForgetPassword", element: <ForgetPassword /> },
      { path: "/OTPVerification", element: <OTPVerification /> },
      { path: "/changePassword", element: <ChangePassword /> },
      {
        path: "/FavouriteLists",
        element: (
          <PrivateRoute>
            <FavouriteLists />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <AuthProvider>
        <AdminProtectedRoute>
          <AdminDashboard />
        </AdminProtectedRoute>
      </AuthProvider>
    ),
    children: [
      { path: "users", element: <UserList /> },
      { path: "tour-guides", element: <TourGuideList /> },
      {
        path: "tour-guide-applications",
        element: <TourGuideApplications />,
      },
      { path: "favourites", element: <FavouriteList /> },
    ],
  },
]);

export default router;
