import { Router } from "express";
import {
  createVacancy,
  getVacancies,
  getVacancyById,
} from "../controllers/Vacancy.js";
import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.get("/", getVacancies);
router.post("/", checkAuth, createVacancy);

router.get("/:url", getVacancyById);

export default router;
