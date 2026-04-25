import { RoleDashboardLayout } from "@/components/layout/role-dashboard-layout";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleDashboardLayout
      role="admin"
      userName="Super Admin"
      userEmail="admin@vprp.com"
    >
      {children}
    </RoleDashboardLayout>
  );
}
