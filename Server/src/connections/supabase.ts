import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";

dotenv.config();

// Create the client
const supabaseUrl = process.env.SUPABASE_BASE_URL!;
const supabaseKey = process.env.SUPABASE_SECRET_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
