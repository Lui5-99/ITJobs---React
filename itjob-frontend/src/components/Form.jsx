import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useVacancy from "../hooks/useVacancy";
import Alert from "../components/Alert";
import { ListSkills } from "../helpers/skills.js";
import Editor from "./Editor.jsx";

const Form = () => {
  const [id, setId] = useState("0");
  const [title, setTitle] = useState("");
  const [enterprise, setEnterprise] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [contract, setContract] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  const params = useParams();
  const { showAlert, alert, submitVacancy, vacancy, load } = useVacancy();

  useEffect(() => {
    // Revisar si la url trae algun id, si es asi llenar los campos
    if (params.url) {
      setId(vacancy._id);
      setTitle(vacancy.title);
      setEnterprise(vacancy.enterprise);
      setLocation(vacancy.location);
      setSalary(vacancy.salary);
      setContract(vacancy.contract);
      setDescription(vacancy.description);
    }
  }, [params, vacancy]);

  useEffect(() => {
    const skillsSet = new Set();
    const addSkills = (e) => {
      if (e.target.tagName === "LI") {
        if (e.target.classList.contains("active")) {
          skillsSet.delete(e.target.textContent);
          e.target.classList.remove("active");
        } else {
          skillsSet.add(e.target.textContent);
          e.target.classList.add("active");
        }
      }
      let skillsArray = [...skillsSet];
      setSkills(skillsArray);
    };
    const skillsDom = document.querySelector(".list-skills");
    if (skillsDom) {
      skillsDom.addEventListener("click", addSkills);
    }
  }, []);

  useEffect(() => {
    const skillsSet = new Set();
    if (params.url) {
      const selectSkills = () => {
        const selects = Array.from(
          document.querySelectorAll(".list-skills .active")
        );
        selects.forEach((sel) => {
          skillsSet.add(sel.textContent);
        });
        const skillsArray = [...skillsSet];
        setSkills(skillsArray);
      };
      const skillsDom = document.querySelector(".list-skills");
      if (skillsDom) {
        selectSkills();
      }
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([title, location, salary, contract, desc, skills].includes("")) {
      showAlert({
        msg: "Todos los campos son requeridos",
        error: true,
      });
      return;
    }
    const newVacancy = {
      id,
      title,
      enterprise,
      location,
      salary,
      contract,
      description: desc,
      skills: skills.split(","),
    };
    await submitVacancy(newVacancy);
    setId("0");
    setTitle("");
    setEnterprise("");
    setLocation("");
    setSalary("");
    setContract("");
    setDescription("");
  };

  const { msg } = alert;

  return load ? (
    <p style={{ color: "#fff" }}>Cargando ...</p>
  ) : (
    <form onSubmit={handleSubmit} className="default-form">
      <h3>Información general</h3>
      <div className="field">
        <label>Titulo</label>
        <input
          type="text"
          placeholder="Ej: React Developer"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Empresa</label>
        <input
          type="text"
          placeholder="Empresa que contrata (opcional)"
          value={enterprise}
          onChange={(e) => {
            setEnterprise(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Ubicación</label>
        <input
          type="text"
          placeholder="Ej: Remoto, Ciudad de Méxio"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Salario(USD)</label>
        <input
          type="text"
          name="salario"
          placeholder="Ej: 300 USD"
          value={salary}
          onChange={(e) => {
            setSalary(e.target.value);
          }}
        />
      </div>
      <div className="field">
        <label>Contrato</label>
        <select
          name="contrato"
          value={contract}
          onChange={(e) => {
            setContract(e.target.value);
          }}
        >
          <option value="">-- Selecciona --</option>
          <option value="Freelance">Freelance</option>
          <option value="Tiempo Completo">Tiempo Completo</option>
          <option value="Medio Tiempo">Medio Tiempo</option>
          <option value="Por Proyecto">Por Proyecto</option>
          <option value="Pasante">Pasante</option>
        </select>
      </div>
      <h3>Descripción del puesto</h3>
      <div className="field description">
        <h3>Descripcion</h3>
        <Editor setDescription={setDescription} description={description} />
      </div>
      <h3>Conocimientos</h3>
      <ul className="list-skills">
        {ListSkills.map((e, index) => (
          <li
            key={index}
            className={vacancy?.skills?.includes(e) ? "active" : ""}
          >
            {e}
          </li>
        ))}
      </ul>
      {msg && <Alert alert={alert} />}
      <div className="field center-horizontal">
        <input type="hidden" name="skills" id="skills" />
        <input type="submit" value="Publicar" className="btn btn-blue" />
      </div>
    </form>
  );
};

export default Form;
