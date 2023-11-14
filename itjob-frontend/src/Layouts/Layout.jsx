import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Search from "../components/Search";
import Logout from "../components/Logout";
import Header from "../components/Header";

const Layout = () => {
  const { auth, load } = useAuth();
  const location = useLocation();
  if (load) return "Loading...";
  return (
    <>
      <div className="name-site conatiner">
        {location.pathname !== "/Login" && (
          <>
            <h1>
              <a href="/">IT Jobs</a>
            </h1>
            {location.pathname !== "/vacantes/nueva" && <Search />}
          </>
        )}
        {auth._id && <Logout />}
      </div>
      <Header />
      <div className="content-principal container">
        <div className="alerts"></div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
