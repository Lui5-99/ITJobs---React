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
    } catch (error) {}
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
      }}
    >
      {children}
    </VacancyContext.Provider>
  );
};

export { VacancyProvider };

export default VacancyContext;
