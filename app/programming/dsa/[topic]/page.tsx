import { DetailPageShell } from "@/components/learning/detail-page-shell";
import { toTitle } from "@/lib/learning";

export default async function ProgrammingDsaPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  return (
    <DetailPageShell
      title={`${toTitle(topic)} DSA`}
      breadcrumb={[
        { label: "Practice", href: "/practice" },
        { label: "Programming", href: "/practice" },
        { label: "DSA", href: `/programming/dsa/${topic}` },
      ]}
      difficulty="Hard"
      showCodeEditor
      relatedTopics={[
        { label: "Graphs", href: "/programming/dsa/graphs" },
        { label: "Trees", href: "/programming/dsa/trees" },
        { label: "Dynamic Programming", href: "/programming/dsa/dynamic-programming" },
      ]}
    />
  );
}
