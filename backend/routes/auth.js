import express from "express";
const router = express.Router();

import { login, logout } from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";

router.post("/login", login);
router.post("/logout", authenticate({ permissions: [] }), logout);

export default router;
