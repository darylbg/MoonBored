import { Router } from "express";
import type { Request, Response } from "express";
import AuthMiddleware from "../../middleware/authMiddleware";
import supabase from "../../connections/supabase";
import bcrypt from "bcrypt";
import { InsertUser, PublicUser } from "@moonbored/types";

const router = Router();

router.post("/admin", async (req: Request, res: Response) => {
  try {
    const { networkSsid, networkPassword, role } = req.body;

    if (!networkSsid || !networkPassword) {
       res.status(400).json({ message: "Network SSID and password are required" });
       return;
    }

    if (role !== "admin") {
        res.status(400).json({ message: "Role must be admin" });
        return;
    }

    const { data, error } = await supabase
      .from("User")
      .select("networkSsid, networkPassword")
      .eq("networkSsid", networkSsid)
      .single();    

    const unhashedPassword = await bcrypt.compare(networkPassword, data?.networkPassword);

    if (!unhashedPassword) {
        res.status(400).json({ message: "Invalid password" });
        return;
    }
    
    res.status(200).json({ message: "Admin login successful" });
    return;
  } catch (error) {
    console.error("Error registering user", error);
    res.status(500).json({ message: "Error registering user", error });
    return;
  }
});





router.get("/", (req, res) => {
    res.send("get users route")
});

// Example of using generateJWT in a route
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    // In a real app, you would validate credentials against a database
    // For this example, we'll just generate a token
    const payload = {
        username,
        role: "user"
    };
    
    // const token = AuthMiddleware.generateJWT(payload);
    // res.json({ token });
});

export default router;