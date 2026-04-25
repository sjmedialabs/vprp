import { createClient } from "@/lib/supabase/server";

export interface LearningProgress {
  id: string;
  user_id: string;
  topic_id: string;
  completion: number;
  updated_at: string;
}

export async function getUserProgress(userId: string): Promise<LearningProgress[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("progress")
    .select("id, user_id, topic_id, completion, updated_at")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
  return (data || []) as LearningProgress[];
}

export async function upsertProgress(input: {
  user_id: string;
  topic_id: string;
  completion: number;
}) {
  const supabase = await createClient();
  return supabase
    .from("progress")
    .upsert({ ...input, updated_at: new Date().toISOString() }, { onConflict: "user_id,topic_id" })
    .select("id, user_id, topic_id, completion, updated_at")
    .single();
}
