// supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://bcqoplezvrkyoshcnpdx.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjcW9wbGV6dnJreW9zaGNucGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNzQwODEsImV4cCI6MjA5MzY1MDA4MX0.MWMZq6qf2nnwDOM3xei4uo71GFuUEE0J4iyLkSlX3G0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);