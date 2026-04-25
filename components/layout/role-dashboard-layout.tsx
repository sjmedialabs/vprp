"use client";

import { usePathname } from "next/navigation";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import type { UserRole } from "@/types";

interface RoleDashboardLayoutProps {
  role: UserRole;
  userName: string;
  userEmail: string;
  children: React.ReactNode;
}

function formatTitle(pathname: string, basePath: string): string {
  const trimmed = pathname.replace(`${basePath}/`, "");
  if (!trimmed || trimmed === pathname) return "Dashboard";

  const segment = trimmed.split("/").pop() || "Dashboard";
  return segment
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function RoleDashboardLayout({
  role,
  userName,
  userEmail,
  children,
}: RoleDashboardLayoutProps) {
  const pathname = usePathname();
  const title = formatTitle(pathname, `/dashboard/${role}`);

  return (
    <DashboardShell role={role} title={title} userName={userName} userEmail={userEmail}>
      {children}
    </DashboardShell>
  );
}
