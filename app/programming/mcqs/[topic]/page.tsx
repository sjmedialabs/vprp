import { DetailPageShell } from "@/components/learning/detail-page-shell";
import { toTitle } from "@/lib/learning";

export default async function ProgrammingMcqPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  return (
    <DetailPageShell
      title={`${toTitle(topic)} MCQs`}
      breadcrumb={[
        { label: "Practice", href: "/practice" },
        { label: "Programming", href: "/practice" },
        { label: "MCQs", href: `/programming/mcqs/${topic}` },
      ]}
      difficulty="Easy"
      relatedTopics={[
        { label: "OS MCQs", href: "/programming/mcqs/os" },
        { label: "OOPS MCQs", href: "/programming/mcqs/oops" },
        { label: "DBMS Exercises", href: "/programming/exercises/sql" },
      ]}
    />
  );
}
