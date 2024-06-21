// src/components/AdminProtectedRoute.tsx

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";

const AdminProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const authContext = useContext(AuthContext);

  if (!authContext || !authContext.token) {
    return <Navigate to="/Login" />;
  }
  const { isAdmin } = authContext;
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtectedRoute;
