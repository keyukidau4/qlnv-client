import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: React.ReactElement }) => {
  const token: string | null = localStorage.getItem("user-info");

  const checkRole: string = JSON.parse(token!)?.role;

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  if (checkRole !== "admin") {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default AdminRoute;
