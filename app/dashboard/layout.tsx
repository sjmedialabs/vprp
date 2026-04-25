// Dashboard Layout - Setup Only
// TODO: Implement authentication check and role-based routing

import { ReactNode } from "react";
import { QueryProvider } from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryProvider>
      <div className="min-h-screen bg-background">
        {children}
      </div>
      <Toaster position="top-right" />
    </QueryProvider>
  );
}
