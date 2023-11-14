import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [load, setLoad] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoad(false);
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clientAxios.get("/users/profile", config);
        setAuth(data.data);
        // if (location.pathname === "/") {
        //   navigate("/admin");
        // }
      } catch (error) {
        setAuth({});
      } finally {
        setLoad(false);
      }
    };
    authUser();
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth, load }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
