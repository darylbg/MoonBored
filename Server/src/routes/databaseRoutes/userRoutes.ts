import { Router } from "express";
import type { Request, Response } from "express";
import AuthMiddleware from "../../middleware/authMiddleware";   
import supabase from "../../connections/supabase";
import bcrypt from "bcrypt";
import { InsertUser, PublicUser } from "@moonbored/types";

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { networkSsid, networkPassword, role } = req.body;

    if (!networkSsid || !networkPassword) {
       res.status(400).json({ message: "Network SSID and password are required" });
       return;
    }

    const hashedPassword = await bcrypt.hash(networkPassword, 10);
    const user: InsertUser = {
      networkSsid,
      networkPassword: hashedPassword,
      name: "test user",
      networkMacAddress: "00:00:00:00:00:00",
      role: role
    };

    const { data: existingUser, error: existingUserError } = await supabase
      .from("User")
      .select("networkSsid")
      .eq("networkSsid", networkSsid)
      .single();    

    if (existingUser) {
        res.status(400).json({ message: "User with that network SSID already exists" });
        return;
      }

    const { data: newUser, error: newUserError } = await supabase
      .from("User")
      .insert(user)
      .select("id, name, networkSsid, createdAt, role")
      .single();

    if (newUserError) {
      res.status(500).json({ message: "Error registering user", newUserError });
      return;
    }

    res.status(201).json({
      message: "User registered successfully",
      data: newUser as PublicUser
    });
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
    const { networkSsid, networkPassword, role } = req.body;
    
    // In a real app, you would validate credentials against a database
    // For this example, we'll just generate a token
    const payload = {
        networkSsid,
        networkPassword,
        role
    };
    
    // const token = AuthMiddleware.generateJWT(payload);
    // res.json({ token });
});

export default router;