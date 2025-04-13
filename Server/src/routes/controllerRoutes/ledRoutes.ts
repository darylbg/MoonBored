import { Router, Request, Response } from "express";
import axios from "axios";

interface ClimbRoute {
  espIp: string;
  routeName?: string;
  climb: {
    holds: {
      index: number;
      type: "start" | "mid" | "end";
      color: "red" | "green" | "blue";
    }[];
  };
}

const router = Router();

// forward climb to esp32
router.post("/", async (req: Request, res: Response) => {
  const { espIp, climb } = req.body as ClimbRoute;

  if (!espIp || !climb) {
    res.status(400).send("Missing data");
    return;
  }

  try {
    const response = await axios.post(`http://${espIp}/climb`, { holds: climb.holds });

  } catch (error) {
    console.log(error);
    res.status(200).send(`error posting climb to controller: ${error}`);
  }

  console.log(climb.holds, espIp);
  res.send("Climb received");
});

export default router;