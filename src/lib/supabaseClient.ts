import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn("⚠️ Missing Supabase environment variables!");
  console.warn("VITE_SUPABASE_URL:", supabaseUrl || "❌ Missing");
  console.warn("VITE_SUPABASE_ANON_KEY:", !!supabaseAnonKey ? "✅ Present" : "❌ Missing");
  console.warn("Supabase features will be disabled.");
}

export const supabaseClient: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient("https://placeholder.supabase.co", "placeholder-key");

export async function getCurrentUser() {
  if (!isSupabaseConfigured) {
    console.warn("⚠️ Supabase not configured - getCurrentUser returning null");
    return null;
  }

  try {
    const { data, error } = await supabaseClient.auth.getSession();
    if (error) {
      console.error("[Auth] Error getting session:", error.message);
      return null;
    }
    return data.session?.user ?? null;
  } catch (err) {
    console.error("[Auth] Unexpected error:", err);
    return null;
  }
}
