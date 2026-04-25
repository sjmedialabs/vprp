import { createClient } from "@/lib/supabase/server";

export interface SearchResultItem {
  id: string;
  title: string;
  type: "topic" | "company" | "question";
}

export async function searchLearning(query: string): Promise<SearchResultItem[]> {
  const supabase = await createClient();
  const term = query.trim();
  if (!term) return [];

  const [topicsRes, companiesRes, questionsRes] = await Promise.all([
    supabase
      .from("topics")
      .select("id, title")
      .ilike("title", `%${term}%`)
      .limit(8),
    supabase
      .from("companies")
      .select("id, name")
      .ilike("name", `%${term}%`)
      .limit(8),
    supabase
      .from("questions")
      .select("id, topic")
      .ilike("topic", `%${term}%`)
      .limit(8),
  ]);

  const topics = (topicsRes.data || []).map((row) => ({
    id: `topic-${row.id}`,
    title: row.title,
    type: "topic" as const,
  }));

  const companies = (companiesRes.data || []).map((row) => ({
    id: `company-${row.id}`,
    title: row.name,
    type: "company" as const,
  }));

  const questions = (questionsRes.data || []).map((row) => ({
    id: `question-${row.id}`,
    title: row.topic,
    type: "question" as const,
  }));

  return [...topics, ...companies, ...questions];
}
