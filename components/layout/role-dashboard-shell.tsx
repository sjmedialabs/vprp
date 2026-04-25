import { ReactNode } from "react";

interface RoleDashboardShellProps {
  roleLabel: string;
  children?: ReactNode;
}

export function RoleDashboardShell({ roleLabel, children }: RoleDashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-[240px_1fr] md:p-6">
        <aside className="rounded-xl border bg-card p-4">
          <p className="text-sm font-semibold text-muted-foreground">Sidebar Placeholder</p>
          <p className="mt-2 text-base font-medium">{roleLabel}</p>
        </aside>
        <main className="rounded-xl border bg-card p-6">
          <h1 className="text-2xl font-semibold">{roleLabel} Dashboard</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Setup scaffold complete. Feature implementation pending.
          </p>
          {children}
        </main>
      </div>
    </div>
  );
}
