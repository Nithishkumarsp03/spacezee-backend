import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes.js";
import { AuthRoutes } from "../modules/auth/auth.routes.js";
import { ProgramRoutes } from "../modules/programs/program.routes.js";
import { LearningMaterialRoutes } from "../modules/learningMaterial/learningMaterial.routes.js";
import { TaskMaterialRoutes } from "../modules/taskMaterial/taskMaterial.routes.js";
import { jwtRoutes } from "../modules/taskJWT/taskJWT.routes.js";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/program",
    route: ProgramRoutes,
  },
  {
    path: "/material",
    route: LearningMaterialRoutes,
  },
  {
    path: "/task",
    route: TaskMaterialRoutes,
  },
  {
    path: "/jwt",
    route: jwtRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
