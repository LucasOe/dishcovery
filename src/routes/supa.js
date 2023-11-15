import { createClient } from "@supabase/supabase-js";

const supabase = createClient('https://wqvjqnqcvsudurdagazt.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxdmpxbnFjdnN1ZHVyZGFnYXp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5ODA4MjUzOCwiZXhwIjoyMDEzNjU4NTM4fQ.JVZL5GdfvUSzBRBaSqpuiKrJvO7SVZObWXdmGfxW6Gc')

export default supabase;