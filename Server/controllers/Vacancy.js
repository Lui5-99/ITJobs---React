import Vacancy from "../models/Vacancy.js";

// GET
const getVacancies = async (req, res) => {
  try {
    const vacancies = Vacancy.find();
    return res.status(200).json({
      status: 200,
      message: "getVacancies",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: `getVacancies, Error: ${error.message}`,
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

export { getVacancies };
