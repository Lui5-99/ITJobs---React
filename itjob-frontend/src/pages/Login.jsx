import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/clientAxios";
import Alert from "../components/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlert({
        msg: "Todos los campos son requeridos",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clientAxios.post("/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.data.token);
      setAuth(data.data);
      setAlert({
        msg: data.message,
        error: false,
      });
      navigate("/admin");
    } catch (error) {
      setAlert({
        msg: error.response.data.message,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <div className="container">
      {msg && <Alert alert={alert} />}
      <form className="default-form" onSubmit={handleSubmit}>
        <div className="field">
          <label>E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="submit"
            value="Iniciar Sesión"
            className="btn btn-blue"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
