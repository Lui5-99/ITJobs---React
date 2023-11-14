import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useVacancy from "../hooks/useVacancy";
import useAuth from "../hooks/useAuth";

const Vacancy = () => {
  const { url } = useParams();
  const { auth } = useAuth();
  const { getVacancyById, vacancy, load } = useVacancy();
  useEffect(() => {
    getVacancyById(url);
  }, [url]);
  const { title, location, contract, salary, description, skills, autor } =
    vacancy;
  return load ? (
    <p>Loading...</p>
  ) : (
    <>
      <div className="content-up vacancy container">
        <div className="box">
          <p className="tag">Empresa</p>
          <p className="name">{title}</p>
        </div>
        <div className="box">
          <p className="tag">Ubicación</p>
          <p className="name">{location}</p>
        </div>
        <div className="box">
          <p className="tag">Contrato</p>
          <p className="name">{contract}</p>
        </div>
        <div className="box">
          <p className="tag">Salario</p>
          <p className="name">{salary}</p>
        </div>
      </div>
      <div className="vacancy-container container">
        <main className="content">
          <h2>Descripción de la vacante</h2>
          <div
            className="vacancy-description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </main>
        <aside className="sidebar">
          <h2>Conocimientos deseados</h2>
          <ul className="skills">
            {skills && skills.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </aside>
        {autor && auth._id === autor._id && (
          <a href={`/vacantes/editar/${url}`} className="btn btn-blue edit-btn">
            Editar vacante
          </a>
        )}
      </div>
      <div className="container data-reclut">
        <div className="send-data">
          <h2>Contactar al reclutador</h2>
          <p>Llena el siguiente formulario para enviar tu solicitud</p>
          <form className="default-form">
            <div className="field">
              <label>Nombre</label>
              <input type="text" name="nombre" placeholder="Tu nombre" />
            </div>
            <div className="field">
              <label>Email</label>
              <input type="email" name="email" placeholder="Tu email" />
            </div>
            <div className="field">
              <label>CV (PDF)</label>
              <input type="file" name="cv" />
            </div>
            <div className="field">
              <input type="submit" className="btn btn-green" value="Enviar" />
            </div>
          </form>
        </div>
        <div className="info-reclut">
          {autor && (
            <>
              <h2>Informacion del reclutador</h2>
              <p>{autor.name}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Vacancy;
