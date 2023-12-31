import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const token = localStorage.getItem("user-info");
  return <>{token ? children : <Navigate to={"/login"} />}</>;
};
export default PrivateRoute;
