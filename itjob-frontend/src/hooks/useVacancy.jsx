import { useContext } from "react";
import VacancyContext from "../context/VacancyContext";

const useVacancy = () => {
  return useContext(VacancyContext);
};

export default useVacancy;
