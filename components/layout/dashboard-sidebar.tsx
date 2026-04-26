"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Video,
  BookOpen,
  Users,
  Building2,
  BarChart3,
  Settings,
  ClipboardList,
  UserCheck,
  CreditCard,
  Shield,
  Bell,
  HelpCircle,
  LogOut,
  UserCircle,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { UserRole } from "@/types";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const studentNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
  { title: "Onboarding", href: "/dashboard/student/onboarding", icon: UserCircle },
  { title: "Baseline test", href: "/dashboard/student/baseline", icon: FileCheck },
  { title: "Profile", href: "/dashboard/student/profile", icon: User },
  { title: "Assessments", href: "/dashboard/student/assessments", icon: FileText },
  { title: "Jobs", href: "/dashboard/student/jobs", icon: Briefcase },
  { title: "Mock Interviews", href: "/dashboard/student/mock-interviews", icon: Video },
  { title: "Training", href: "/dashboard/student/training", icon: BookOpen },
  { title: "Skill Passport", href: "/dashboard/student/passport", icon: GraduationCap },
  { title: "Rankings", href: "/dashboard/student/rankings", icon: BarChart3 },
];

const cpoNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard/cpo", icon: LayoutDashboard },
  { title: "Students", href: "/dashboard/cpo/students", icon: Users },
  { title: "Companies", href: "/dashboard/cpo/companies", icon: Building2 },
  { title: "Analytics", href: "/dashboard/cpo/analytics", icon: BarChart3 },
  { title: "Assessments", href: "/dashboard/cpo/assessments", icon: ClipboardList },
  { title: "Settings", href: "/dashboard/cpo/settings", icon: Settings },
];

const recruiterNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard/recruiter", icon: LayoutDashboard },
  { title: "Jobs", href: "/dashboard/recruiter/jobs", icon: Briefcase },
  { title: "Applications", href: "/dashboard/recruiter/applications", icon: ClipboardList },
  { title: "Colleges", href: "/dashboard/recruiter/colleges", icon: GraduationCap },
  { title: "Company Profile", href: "/dashboard/recruiter/company", icon: Building2 },
  { title: "Analytics", href: "/dashboard/recruiter/analytics", icon: BarChart3 },
];

const adminNavItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
  { title: "Users", href: "/dashboard/admin/users", icon: Users },
  { title: "Colleges", href: "/dashboard/admin/colleges", icon: GraduationCap },
  { title: "Companies", href: "/dashboard/admin/companies", icon: Building2 },
  { title: "Subscriptions", href: "/dashboard/admin/subscriptions", icon: CreditCard },
  { title: "Assessments", href: "/dashboard/admin/assessments", icon: ClipboardList },
  { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const navItemsByRole: Record<UserRole, NavItem[]> = {
  student: studentNavItems,
  cpo: cpoNavItems,
  recruiter: recruiterNavItems,
  admin: adminNavItems,
  super_admin: adminNavItems,
};

interface DashboardSidebarProps {
  role: UserRole;
  userName?: string;
  userEmail?: string;
}

export function DashboardSidebar({
  role,
  userName = "User",
  userEmail = "user@example.com",
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const navItems = navItemsByRole[role] || studentNavItems;

  const roleLabels: Record<UserRole, string> = {
    student: "Student",
    cpo: "Placement Officer",
    recruiter: "Recruiter",
    admin: "Admin",
    super_admin: "Super Admin",
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-sidebar-border/80 bg-sidebar/95 backdrop-blur">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-sidebar-border/80 px-6">
        <div className="rounded-xl bg-primary/15 p-2">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <div>
          <span className="text-lg font-bold text-sidebar-foreground">VPRP</span>
          <p className="text-xs text-muted-foreground">{roleLabels[role]}</p>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <Separator className="my-4" />

        {/* Secondary Navigation */}
        <nav className="flex flex-col gap-1">
          <Link
            href="/dashboard/notifications"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <Bell className="h-4 w-4" />
            Notifications
          </Link>
          <Link
            href="/help"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent/50"
          >
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </Link>
        </nav>
      </ScrollArea>

      {/* User Profile */}
      <div className="border-t border-sidebar-border/80 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/90 text-primary-foreground">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {userName}
            </p>
            <p className="truncate text-xs text-muted-foreground">{userEmail}</p>
          </div>
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mt-3 w-full justify-start text-muted-foreground hover:text-destructive"
        >
          <Link href="/auth/login">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Link>
        </Button>
      </div>
    </div>
  );
}
