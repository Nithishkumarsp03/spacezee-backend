import express from "express";
import auth from "../../middleware/auth.js";
import { UserRole } from "../user/user.constant.js";
import validateRequest from "../../middleware/validateRequest.js";
import { programValidation } from "./programs.validation.js";
import { ProgramController } from "./program.controller.js";

const router = express.Router();
router.post(
  "/create-program",
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(programValidation.programValidationSchema),
  ProgramController.createProgram
);
router.get(
  "/",
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  ProgramController.getAllPrograms
);

export const ProgramRoutes = router;
