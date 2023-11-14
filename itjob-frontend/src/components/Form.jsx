import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useVacancy from "../hooks/useVacancy";
import Alert from "../components/Alert";
import { ListSkills } from "../helpers/skills.js";

const Form = () => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [enterprise, setEnterprise] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [contract, setContract] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");

  const { url } = useParams();

  useEffect(() => {
    // Revisar si la url trae algun id, si es asi llenar los campos
    if (url) {
      getVacancyById(url);
      if (vacancy) {
        setId(vacancy._id);
        setTitle(vacancy.title);
        setEnterprise(vacancy.enterprise);
        setLocation(vacancy.location);
        setSalary(vacancy.salary);
        setContract(vacancy.contract);
        setDescription(vacancy.description);
      }
    }
  }, [url]);

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
      const skillsArray = [...skillsSet];
      document.querySelector("#skills").value = skillsArray;
      setSkills(document.querySelector("#skills").value);
    };
    const skillsDom = document.querySelector(".list-skills");
    if (skillsDom) {
      skillsDom.addEventListener("click", addSkills);
    }
  }, []);

  const { showAlert, alert, submitVacancy, vacancy, getVacancyById } =
    useVacancy();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const desc = document.querySelector("input[name='description']").value;
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
    console.log(newVacancy);
    await submitVacancy(newVacancy);
    setId(null);
    setTitle("");
    setEnterprise("");
    setLocation("");
    setSalary("");
    setContract("");
    setDescription("");
  };

  const { msg } = alert;

  return (
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
        <input type="hidden" id="x" name="description" />
        <trix-editor input="x"></trix-editor>
      </div>
      <h3>Conocimientos</h3>
      <ul className="list-skills">
        {ListSkills.map((e, index) => (
          <li key={index}>{e}</li>
        ))}
      </ul>
      {msg && <Alert alert={alert} />}
      <div className="field center-horizontal">
        <input
          type="hidden"
          name="skills"
          id="skills"
          value={skills}
          onChange={(e) => {
            setSkills(e.target.value);
          }}
        />
        <input type="submit" value="Publicar" className="btn btn-blue" />
      </div>
    </form>
  );
};

export default Form;
