import { DetailPageShell } from "@/components/learning/detail-page-shell";
import { toTitle } from "@/lib/learning";

export default async function CompanyAptitudePage({
  params,
}: {
  params: Promise<{ company: string }>;
}) {
  const { company } = await params;

  return (
    <DetailPageShell
      title={`${toTitle(company)} Aptitude Questions`}
      breadcrumb={[
        { label: "Practice", href: "/practice" },
        { label: "Company Specific", href: "/practice" },
        { label: toTitle(company), href: `/company/${company}/aptitude` },
      ]}
      difficulty="Medium"
      relatedTopics={[
        { label: `${toTitle(company)} Exam`, href: `/company/${company}/exam` },
        { label: "Accenture Aptitude", href: "/company/accenture/aptitude" },
        { label: "TCS Aptitude", href: "/company/tcs/aptitude" },
      ]}
    />
  );
}
