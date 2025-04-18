import express from "express";
import auth from "../../middleware/auth.js";
import { UserRole } from "../user/user.constant.js";
import validateRequest from "../../middleware/validateRequest.js";
import { learningMaterialValidation } from "./learningMaterial.validation.js";
import { LearningMaterialController } from "./learningMaterial.controller.js";

const router = express.Router();

router.post(
  "/create-learning-material",
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(learningMaterialValidation.learningMaterialValidationSchema),
  LearningMaterialController.createLearningMaterial
);

router.get(
  "/:id",
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  LearningMaterialController.getAllLearningMaterialById
);
router.get(
  "/",
  // auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  LearningMaterialController.getAllLearningMaterials
);

export const LearningMaterialRoutes = router;
