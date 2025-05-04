import { Router, Request, Response } from "express";
import { UserCredentials } from "@moonbored/types";
import supabase from "../../connections/supabase";

const router = Router();

let currentControllerIp: string | null = null;

// update new user with the ip they can access the controller
router.post("/register-ip", async (req: Request, res: Response) => {
  const { networkSsid, networkMacAddress, controllerIp } = req.body;

  if (!networkSsid || !controllerIp || !networkMacAddress) {
    console.error("Missing data");
    res.status(400).json({ status: "missing data" });
    return;
  }

  // Update controllerIp and return only that field
  const { data, error } = await supabase
    .from("User")
    .update({ controllerIp })
    .eq("networkSsid", networkSsid)
    .select("controllerIp");

  if (error) {
    console.error("Supabase update error:", error);
    res.status(500).json({ status: "update failed", error: error.message });
    return;
  }

  const rows = data as { controllerIp: string }[];
  if (!rows || rows.length === 0) {
    res.status(404).json({ status: "ssid not found" });
    return;
  }

  currentControllerIp = rows[0].controllerIp;

  console.log(`Updated user with SSID ${networkSsid} → IP: ${controllerIp}`);
  res.status(200).json({ status: "updated", controllerIp });
  return;
});



// Refresh users route - sends network credentials to controller
router.post("/refresh-controller-users", async (req: Request, res: Response) => {
    // if (!currentControllerIp) {
    //   res.status(400).json({ message: "No controller IP registered yet" });
    //   return;
    // }
  
    try {
      // 1. Get all users with their network credentials
      const { data: users, error } = await supabase
        .from("User")
        .select("id, networkSsid, networkPassword, networkMacAddress")
        .not("networkPassword", "is", null)
        .not("networkSsid", "is", null);
  
      if (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users", error });
        return;
      }
  
      if (!users || users.length === 0) {
        res.status(200).json({ message: "No users with network credentials found" });
        return;
      }
  
      // 2. Send users to controller
      try {
        const response = await axios.post(
          `http://${currentControllerIp}/set-users`,
          { users }
        );
        
        console.log(`Sent ${users.length} user credentials to controller at ${currentControllerIp}`);
        res.status(200).json({
          message: "Users sent to controller",
          count: users.length,
          controllerResponse: response.data
        });
      } catch (err: any) {
        console.error("Failed to contact controller:", err.message);
        res.status(500).json({ 
          message: "Failed to contact controller", 
          error: err.message 
        });
      }
    } catch (err: any) {
      console.error("Unexpected error:", err.message);
      res.status(500).json({ 
        message: "Unexpected error", 
        error: err.message 
      });
    }
  });


  export default router;