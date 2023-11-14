import React from "react";
import Vacancy from "../components/Vacancy";
import useVacancy from "../hooks/useVacancy";

const Home = () => {
  const { vacancies } = useVacancy();
  return (
    <main className="list-vacancies">
      {vacancies.map((element) => (
        <Vacancy key={element._id} vacancy={element} />
      ))}
    </main>
  );
};

export default Home;
