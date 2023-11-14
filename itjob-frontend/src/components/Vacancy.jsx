import React from "react";

const Vacancy = ({ vacancy }) => {
  const { title, location, contract, url, enterprise } = vacancy;
  return (
    <div className="vacancy">
      <div className="box">
        <h3>{enterprise}</h3>
        <p className="work">{title}</p>
      </div>
      <div className="box">
        <p className="tag">Ubicación</p>
        <p className="name">{location}</p>
      </div>
      <div className="box">
        <p className="tag">Contrato</p>
        <p className="name">{contract}</p>
      </div>
      <div className="box center-vertical">
        <a href={`/vacantes/${url}`} className="btn btn-green">
          Más info
        </a>
      </div>
    </div>
  );
};

export default Vacancy;
