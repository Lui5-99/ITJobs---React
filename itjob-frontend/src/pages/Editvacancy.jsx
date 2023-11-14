import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { useEffect } from "react";
import useVacancy from "../hooks/useVacancy";

const Editvacancy = () => {
  const { url } = useParams();
  const { getVacancyById, setLoad } = useVacancy();
  useEffect(() => {
    const getVacancy = async () => {
      await getVacancyById(url);
    };
    getVacancy();
  }, [url]);
  return (
    <main className="container">
      <Form />
    </main>
  );
};

export default Editvacancy;
