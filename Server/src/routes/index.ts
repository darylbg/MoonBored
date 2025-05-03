import { Router } from "express";
import databaseRoutes from "./databaseRoutes";
import controllerRoutes from "./controllerRoutes";
import AuthMiddleware from "../middleware/authMiddleware";

const router = Router();

router.use("/database", databaseRoutes);
router.use("/controller", controllerRoutes);

export default router;
