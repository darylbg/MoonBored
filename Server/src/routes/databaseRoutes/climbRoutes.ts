import { Router, Request, Response } from "express";
import {Climb} from "@moonbored/types";

const router = Router();

router.get("/", (req, res) => {
    const climbs: Climb[] = [
        {message: "get all climbs"}
    ]
    res.send(climbs);
});

router.post("/add-climb", async (req: Request, res: Response) => {
    try {
        res.status(200).send("added climb");
    } catch (error) {
        console.log("error adding climb");
        res.status(500).send("error adding climb");
    }
});

export default router;