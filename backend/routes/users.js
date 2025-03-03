import express from "express";
const router = express.Router();

import {
  getUser,
  createUser,
  editUser,
  getUsers,
} from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";

router.post("/", createUser);
router.get("/:id", authenticate, getUser);
router.put("/:id", editUser);
router.get("/", authenticate, getUsers);

export default router;
