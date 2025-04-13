import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.send("this is a route test hi")
})

export default router;