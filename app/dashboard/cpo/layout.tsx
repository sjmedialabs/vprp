import { RoleDashboardLayout } from "@/components/layout/role-dashboard-layout";

export default function CpoDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleDashboardLayout
      role="cpo"
      userName="Dr. Sharma"
      userEmail="placement@college.edu"
    >
      {children}
    </RoleDashboardLayout>
  );
}
