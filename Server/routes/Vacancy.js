import { Router } from "express";
import { getVacancies } from "../controllers/Vacancy";

const router = Router();

router.get("/", getVacancies);
router.post("/");

export default router;
