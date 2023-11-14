import React from "react";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <header className="site-header container separate">
      <h2>IT Jobs</h2>
      <p className="tagline">Encuentra el trabajo de tus sueños</p>
      {auth._id && location.pathname !== "/vacantes/nueva" && (
        <a href="/vacantes/nueva" className="btn btn-blue">
          Publicar nueva vacante
        </a>
      )}
    </header>
  );
};

export default Header;
