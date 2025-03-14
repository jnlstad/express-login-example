import express from "express";
const router = express.Router();

import {
  getUser,
  createUser,
  editUser,
  getUsers,
} from "../controllers/index.js";
import { authenticate } from "../middleware/authenticate.js";

router.post("/", authenticate, createUser);
router.get(
  "/:id",
  authenticate({ permissions: ["users_admin", "users_view"] }),
  getUser
);
router.put("/:id", authenticate({ permissions: ["users_admin"] }), editUser);
router.get(
  "/",
  authenticate({ permissions: ["users_admin", "users_view"] }),
  getUsers
);

export default router;
