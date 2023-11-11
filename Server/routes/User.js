import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  login,
} from "../controllers/User.js";

const router = express.Router();

// GET
router.get("/", getUsers);
//router.get("/:id", getUserById);

// POST
router.post("/", createUser);
router.post("/login", login);

export default router;
