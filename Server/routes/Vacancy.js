import { Router } from "express";
import {
  createVacancy,
  editVacancy,
  getVacancies,
  getVacancyById,
} from "../controllers/Vacancy.js";
import checkAuth from "../middleware/checkAuth.js";

const router = Router();

// GET
router.get("/", getVacancies);
router.get("/:url", getVacancyById);

// POST
router.post("/", checkAuth, createVacancy);

// PUT
router.post("/:url", checkAuth, editVacancy);

export default router;
