import express from "express";
import auth from "../../middleware/auth.js";
import { UserRole } from "../user/user.constant.js";
import validateRequest from "../../middleware/validateRequest.js";
import { taskMaterialValidation } from "./taskMaterial.validation.js";
import { TaskMaterialController } from "./taskMaterial.controller.js";

const router = express.Router();

router.post(
  "/create-task-material",
  auth(UserRole.admin, UserRole.superAdmin),
  validateRequest(taskMaterialValidation.taskMaterialValidationSchema),
  TaskMaterialController.createTaskMaterial
);

router.get(
  "/:id",
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  TaskMaterialController.getAllTaskMaterialById
);
router.get(
  "/",
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  TaskMaterialController.getAllTaskMaterials
);
router.post(
  "/content/:id",
  auth(UserRole.admin, UserRole.superAdmin, UserRole.user),
  TaskMaterialController.getCourseContentById
);

export const TaskMaterialRoutes = router;
