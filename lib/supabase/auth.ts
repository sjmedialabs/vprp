import { createClient as createBrowserSupabaseClient } from "@/lib/supabase/client";

export async function signInWithEmailOtp(email: string) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signInWithOtp({ email });
}

export async function verifyEmailOtp(email: string, token: string) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
}

export async function signOut() {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signOut();
}
