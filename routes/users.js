import express from "express";
const router = express.Router();

import {
  getUser,
  createUser,
  editUser,
  getUsers,
} from "../controllers/index.js";

router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.get("/", getUsers);

export default router;
