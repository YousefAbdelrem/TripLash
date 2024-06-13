import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import SignIn from "../components/SignIn";
import ForgetPassowrd from "../components/ForgetPassword";
import OTPVerification from "../components/OTPVerification";
import ChangePassword from "../components/ChangePassword"; 

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/Login", element: <Login /> },
  { path: "/SignIn", element: <SignIn /> },
  { path: "/ForgetPassword", element: <ForgetPassowrd /> },
  { path: "/OTPVerification", element: <OTPVerification /> },
  { path: "/changePassword", element: <ChangePassword /> }, // Use the imported changePassword component
]);

export default router;
