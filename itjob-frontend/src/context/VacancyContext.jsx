import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const VacancyContext = createContext();

const VacancyProvider = ({ children }) => {
  const [vacancies, setVacancies] = useState([]);
  const [vacancy, setVacancy] = useState({});
  const [alert, setAlert] = useState({});
  const [load, setLoad] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getVacancies = async () => {
      try {
        const { data } = await clientAxios.get("/vacancies");
        setVacancies(data.data);
      } catch (error) {
        console.log(error);
        setAlert({
          msg: error.message,
          error: true,
        });
      }
    };
    getVacancies();
  }, []);

  const getVacancyById = async (url) => {
    try {
      setLoad(true);
      const { data } = await clientAxios.get(`/vacancies/${url}`);
      setVacancy(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoad(false);
    }
  };

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitVacancy = async (vacancy) => {
    if (vacancy.id) {
      await editVacancy(vacancy);
    } else {
      await newVacancy(vacancy);
    }
  };

  const newVacancy = async (vacancy) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post("/vacancies", vacancy, config);
      setVacancies([...vacancies, data.data]);
      setAlert({
        msg: "Tu vacante ha sido creada!!!",
        error: false,
      });
      setTimeout(() => {
        setAlert({});
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error);
      setAlert({
        msg: error.message,
        error: true,
      });
    }
  };

  const editVacancy = async (vacancy) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clientAxios.post(
        `/vacancies/${vacancy.url}`,
        vacancy,
        config
      );
      const edit = vacancies.map((e) =>
        e._id === data.data._id ? data.data : e
      );
      setVacancies(edit);
      setAlert({
        msg: "Vacante actualizada",
        error: false,
      });
      setTimeout(() => {
        setAlert({});
        navigate("/");
      }, 3000);
    } catch (error) {
      console.log(error.data);
      setAlert({
        msg: error.message,
        error: true,
      });
    }
  };

  return (
    <VacancyContext.Provider
      value={{
        submitVacancy,
        showAlert,
        alert,
        vacancy,
        vacancies,
        getVacancyById,
        load,
        setLoad,
      }}
    >
      {children}
    </VacancyContext.Provider>
  );
};

export { VacancyProvider };

export default VacancyContext;
