import { DetailPageShell } from "@/components/learning/detail-page-shell";
import { toTitle } from "@/lib/learning";

export default async function AptitudeTopicPage({
  params,
}: {
  params: Promise<{ category: string; topic: string }>;
}) {
  const { category, topic } = await params;
  const title = `${toTitle(topic)} (${toTitle(category)})`;

  return (
    <DetailPageShell
      title={title}
      breadcrumb={[
        { label: "Practice", href: "/practice" },
        { label: "Aptitude", href: "/practice" },
        { label: toTitle(category), href: `/aptitude/${category}/${topic}` },
      ]}
      difficulty="Medium"
      relatedTopics={[
        { label: "Mock Test", href: "/dashboard/student/assessments" },
        { label: "Verbal Ability", href: "/aptitude/verbal-ability/reading-comprehension" },
        { label: "Logical Reasoning", href: "/aptitude/logical-reasoning/syllogisms" },
      ]}
    />
  );
}
