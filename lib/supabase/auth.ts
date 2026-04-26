import { createClient as createBrowserSupabaseClient } from "@/lib/supabase/client";

export async function signInWithEmailPassword(email: string, password: string) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signInWithEmailOtp(
  email: string,
  options?: { shouldCreateUser?: boolean }
) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: options?.shouldCreateUser ?? true,
      emailRedirectTo:
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : undefined,
    },
  });
}

export async function signInWithPhoneOtp(
  phone: string,
  options?: { shouldCreateUser?: boolean }
) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signInWithOtp({
    phone,
    options: { shouldCreateUser: options?.shouldCreateUser ?? true },
  });
}

export async function signInWithGoogle() {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}

export async function verifyEmailOtp(email: string, token: string) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });
}

export async function verifyPhoneOtp(phone: string, token: string) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });
}

export async function signOut() {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signOut();
}
