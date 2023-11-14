import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Layout from "./Layout";

const RouteProtect = () => {
  const { auth, load } = useAuth();
  if (load) return "Loading...";
  return <>{auth._id ? <Layout /> : <Navigate to="/Login" />}</>;
};

export default RouteProtect;
