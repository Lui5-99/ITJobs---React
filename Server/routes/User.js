import express from "express";
import {
  createUser,
  getUserById,
  getUsers,
  login,
  profile,
} from "../controllers/User.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

// GET
router.get("/", getUsers);
//router.get("/:id", getUserById);
router.get("/profile", checkAuth, profile);

// POST
router.post("/", createUser);
router.post("/login", login);

export default router;
