import { createClient } from "@/lib/supabase/server";

export interface LearningTopic {
  id: string;
  slug: string;
  title: string;
  domain: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export async function getTopics(domain?: string): Promise<LearningTopic[]> {
  const supabase = await createClient();

  let query = supabase
    .from("topics")
    .select("id, slug, title, domain, category, difficulty")
    .order("title", { ascending: true });

  if (domain) {
    query = query.eq("domain", domain);
  }

  const { data } = await query;
  return (data || []) as LearningTopic[];
}
