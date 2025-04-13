import { Router } from "express";
import testRoute from "./databaseRoutes/testRoute";
import ledRoutes from "./controllerRoutes/ledRoutes";

const router = Router();

router.use("/database", testRoute);
router.use("/controller", ledRoutes);

export default router;
