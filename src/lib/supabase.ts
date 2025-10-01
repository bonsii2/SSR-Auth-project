import { createClient } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseAdmin =createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
)



