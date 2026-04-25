import { RoleDashboardLayout } from "@/components/layout/role-dashboard-layout";

export default function RecruiterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleDashboardLayout
      role="recruiter"
      userName="Hiring Manager"
      userEmail="hr@techcorp.com"
    >
      {children}
    </RoleDashboardLayout>
  );
}
