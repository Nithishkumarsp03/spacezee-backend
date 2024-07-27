import express from "express";
import validateRequest from "../../middleware/validateRequest.js";
import auth from "../../middleware/auth.js";
import { UserRole } from "./user.constant.js";
import { UserValidation } from "./user.validation.js";
import { UserController } from "./user.controller.js";

const router = express.Router();

router.post(
  "/create-user",
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(UserValidation.userValidationSchema),
  UserController.createUser
);

router.get(
  "/",
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  UserController.getMe
);
router.patch(
  "/change-status",
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(UserValidation.userChangeStatusValidationSchema),
  UserController.changeStatus
);

router.delete(
  "/:email",
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(UserValidation.userDelateSchema),
  UserController.deleteUser
);

export const UserRoutes = router;
