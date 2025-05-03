import { Router, Request, Response } from "express";
import axios from "axios";

interface Move {
  description: number;
  isStart: boolean;
  isEnd: boolean;
}

interface ClimbRoute {
  espIp: string;
  routeName?: string;
  moves: Move[];
}

const router = Router();

// Forward climb to ESP32
router.post("/climb-builder", async (req: Request, res: Response) => {
  const { espIp, moves, routeName } = req.body as ClimbRoute;

  if (!espIp || !moves) {
    res.status(400).send("Missing data: espIp or moves");
    return;
  }

  try {
    await axios.post(`http://${espIp}/climb-builder`, { moves });
    console.log(`Route "${routeName || "Unnamed"}" sent to ESP at ${espIp}`);
    console.log("Moves:", moves);
    res.send("Climb sent to ESP32");
  } catch (error) {
    console.error("Error posting climb to controller:", error);
    res.status(500).send("Failed to send climb to ESP32");
  }
});

export default router;
