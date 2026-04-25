import { RoleDashboardLayout } from "@/components/layout/role-dashboard-layout";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleDashboardLayout
      role="student"
      userName="John Doe"
      userEmail="john.doe@college.edu"
    >
      {children}
    </RoleDashboardLayout>
  );
}
