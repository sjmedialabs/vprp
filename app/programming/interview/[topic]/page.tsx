import { DetailPageShell } from "@/components/learning/detail-page-shell";
import { toTitle } from "@/lib/learning";

export default async function ProgrammingInterviewTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  return (
    <DetailPageShell
      title={`${toTitle(topic)} Interview Questions`}
      breadcrumb={[
        { label: "Practice", href: "/practice" },
        { label: "Programming", href: "/practice" },
        { label: "Interview", href: `/programming/interview/${topic}` },
      ]}
      difficulty="Medium"
      relatedTopics={[
        { label: "System Design", href: "/programming/interview/system-design" },
        { label: "AWS", href: "/programming/interview/aws" },
        { label: "React", href: "/programming/interview/react" },
      ]}
    />
  );
}
