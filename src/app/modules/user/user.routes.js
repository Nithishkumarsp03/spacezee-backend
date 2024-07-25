import express from "express";
import validateRequest from "../../middleware/validateRequest.js";
import auth from "../../middleware/auth.js";
import { UserRole } from "./user.constant.js";
import { UserValidation } from "./user.validation.js";
import { UserController } from "./user.controller.js";

const router = express.Router();

router.post(
  "/create-user",
  // auth(UserRole.admin),
  validateRequest(UserValidation.userValidationSchema),
  UserController.createUser
);

export const UserRoutes = router;
