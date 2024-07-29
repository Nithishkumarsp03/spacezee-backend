import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes.js";
import { AuthRoutes } from "../modules/auth/auth.routes.js";
import { ProgramRoutes } from "../modules/programs/program.routes.js";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
