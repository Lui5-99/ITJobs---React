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
    const response = await newVacancy.save();
    return res.status(200).json({
      status: 200,
      message: "createVacancy",
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: `createVacancy, Error: ${error.message}`,
    });
  }
};

export { getVacancies, createVacancy, getVacancyById };
