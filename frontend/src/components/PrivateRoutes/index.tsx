import { Navigate, Outlet } from "react-router-dom";
export const PrivateRoutes = () => {
  const token = localStorage.getItem("jwt");
  return token ? <Outlet /> : <Navigate to="/" />;
};
