import { Router } from "express";
import ledRoutes from "./ledRoutes";
import userRoutes from "./userRoutes";

const router = Router();

router.use("/led", ledRoutes);
router.use("/user", userRoutes);

export default router;