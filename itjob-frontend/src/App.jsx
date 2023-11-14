import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./Layouts/Layout";
import Newvacancy from "./pages/NewVacancy";
import { VacancyProvider } from "./context/VacancyContext";
import RouteProtect from "./Layouts/RouteProtect";
import Vacancy from "./pages/Vacancy";
import Editvacancy from "./pages/Editvacancy";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <AuthProvider>
        <VacancyProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/vacantes/:url" element={<Vacancy />} />
            </Route>
            <Route path="/vacantes" element={<RouteProtect />}>
              <Route path="nueva" element={<Newvacancy />} />
              <Route path="editar/:url" element={<Editvacancy />} />
            </Route>
          </Routes>
        </VacancyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
