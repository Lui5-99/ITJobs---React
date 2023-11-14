import Vacancy from "../models/Vacancy.js";

// GET
const getVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    return res.status(200).json({
      status: 200,
      message: "getVacancies",
      data: vacancies,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: `getVacancies, Error: ${error.message}`,
    });
  }
};

const getVacancyById = async (req, res) => {
  try {
    const { url } = req.params;
    const vacancy = await Vacancy.findOne({ url }).populate({ path: "autor" });
    return res
      .status(200)
      .json({ status: 200, message: "getVacancyById", data: vacancy });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: `getVacancyById, Error: ${error.message}`,
    });
  }
};

// POST
const createVacancy = async (req, res) => {
  try {
    const newVacancy = new Vacancy(req.body);
    newVacancy.autor = req.user._id.toString();
    const response = await newVacancy.save();
    return res.status(200).json({
      status: 200,
      message: "createVacancy",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 400,
      message: `createVacancy, Error: ${error.message}`,
    });
  }
};

// PUT
const editVacancy = async (req, res) => {
  try {
    const { url } = req.params;
    const vacancy = await Vacancy.findOne({ url });
    // Validacion si existe la vacante
    if (!vacancy)
      return res.status(403).json({
        status: 403,
        message: `editVacancy, Error: ${
          new Error("Vacante no encontrada").message
        }`,
      });
    // validacion si el usuario que esta editando es el creador
    if (vacancy.autor.toString() !== req.user._id.toString())
      return res.status(401).json({
        status: 401,
        message: `editVacancy, Error: ${
          new Error("No tienes los permisos para modificar esta vacante")
            .message
        }`,
      });
    vacancy.title = req.body.title || vacancy.title;
    vacancy.enterprise = req.body.enterprise || vacancy.enterprise;
    vacancy.location = req.body.location || vacancy.location;
    vacancy.salary = req.body.salary || vacancy.salary;
    vacancy.contract = req.body.contract || vacancy.contract;
    vacancy.description = req.body.description || vacancy.description;
    vacancy.skills = req.body.skills || vacancy.skills;

    const response = await vacancy.save();

    return res.status(200).json({
      status: 200,
      message: "editVacancy, vacante actualizada",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(403)
      .json({ status: 403, message: `editVacancy, Error: ${error.message}` });
  }
};

export { getVacancies, createVacancy, getVacancyById, editVacancy };
