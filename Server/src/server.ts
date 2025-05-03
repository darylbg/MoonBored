import express from "express";
import cors from "cors";
import { Router } from "express";
import routes from "./routes";
import supabase from "./connections/supabase";
import AuthMiddleware from "./middleware/authMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;
const router = Router();

app.use(express.json());
app.use(cors({
    origin: "https://localhost:5173",
}))

app.use("/api", routes);

const getAllUsers = async () => {
        // Fetch all users
const {data, error} = await supabase.from("User").select('*');
console.log(data, error)
}

app.listen(PORT, () => {
    console.log(`Server running on  http://localhost:${PORT}`);
    getAllUsers();
});