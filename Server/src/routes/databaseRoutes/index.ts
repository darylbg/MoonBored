import { Router } from "express";
import userRoutes from "./userRoutes"
import climbRoutes from "./climbRoutes";
import adminRoutes from "./adminRoutes";
const router = Router();

router.use("/users", userRoutes);
router.use("/climbs", climbRoutes);
router.use("/admin", adminRoutes);

export default router;