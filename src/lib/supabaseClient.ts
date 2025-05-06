import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zzyrdlpzznrquculdveh.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6eXJkbHB6em5ycXVjdWxkdmVoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjQ4OTU1NSwiZXhwIjoyMDYyMDY1NTU1fQ.F4wCWphPHM4aEui9SK8vHZ9G0Wm_t_uyyvopp1j7YRY";

export const supabase = createClient(supabaseUrl, supabaseKey);
