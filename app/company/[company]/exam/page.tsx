import { DetailPageShell } from "@/components/learning/detail-page-shell";
import { toTitle } from "@/lib/learning";

export default async function CompanyExamPage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;

  return (
    <DetailPageShell
      title={`${toTitle(company)} Placement Exam`}
      breadcrumb={[
        { label: "Practice", href: "/practice" },
        { label: "Company Specific", href: "/practice" },
        { label: toTitle(company), href: `/company/${company}/exam` },
      ]}
      difficulty="Hard"
      relatedTopics={[
        { label: `${toTitle(company)} Aptitude`, href: `/company/${company}/aptitude` },
        { label: "Infosys Exam", href: "/company/infosys/exam" },
        { label: "Wipro Exam", href: "/company/wipro/exam" },
      ]}
    />
  );
}
