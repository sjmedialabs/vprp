import { DetailPageShell } from "@/components/learning/detail-page-shell";
import { toTitle } from "@/lib/learning";

export default async function ProgrammingExercisePage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  return (
    <DetailPageShell
      title={`${toTitle(language)} Exercises`}
      breadcrumb={[
        { label: "Practice", href: "/practice" },
        { label: "Programming", href: "/practice" },
        { label: "Exercises", href: `/programming/exercises/${language}` },
      ]}
      difficulty="Medium"
      showCodeEditor
      relatedTopics={[
        { label: "DSA Arrays", href: "/programming/dsa/arrays" },
        { label: "Interview React", href: "/programming/interview/react" },
        { label: "Technical MCQ DBMS", href: "/programming/mcqs/dbms" },
      ]}
    />
  );
}
