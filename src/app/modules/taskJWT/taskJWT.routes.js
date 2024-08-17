import express from "express";
import auth from "../../middleware/auth.js";
import { UserRole } from "../user/user.constant.js";
import { TaskJwtController } from "./taskJWT.controller.js";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  TaskJwtController.createTaskJwt
);

export const jwtRoutes = router;
