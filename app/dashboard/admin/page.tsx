// Super Admin Dashboard - Setup Only
// TODO: Implement admin-specific features with real data

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Building2,
  IndianRupee,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
        {/* Welcome Section */}
        <div className="rounded-2xl border border-border/70 bg-gradient-to-r from-primary/10 via-card to-accent/40 p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-foreground">
            Platform Overview
          </h2>
          <p className="mt-1 text-muted-foreground">
            Monitor platform health, manage users, and track revenue
          </p>
        </div>

        {/* Platform Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Users</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24,856</div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-600">+1,234</span> this month
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Colleges</CardDescription>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="mt-2 text-xs text-muted-foreground">
                142 active subscriptions
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Companies</CardDescription>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="mt-2 text-xs text-muted-foreground">
                456 actively hiring
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Monthly Revenue</CardDescription>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18.5L</div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> vs last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pending Verifications */}
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Verifications</CardTitle>
                <CardDescription>
                  Awaiting admin approval
                </CardDescription>
              </div>
              <Badge variant="destructive">12 pending</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  type: "College",
                  name: "ABC Engineering College",
                  submitted: "2 days ago",
                },
                {
                  type: "Company",
                  name: "StartupXYZ Pvt Ltd",
                  submitted: "3 days ago",
                },
                {
                  type: "Recruiter",
                  name: "John Smith - TechCorp",
                  submitted: "4 days ago",
                },
                {
                  type: "College",
                  name: "XYZ Institute of Technology",
                  submitted: "5 days ago",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-card/70 p-3"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.type} - Submitted {item.submitted}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href="/dashboard/admin/users">Review</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card className="border-border/70 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest subscription payments</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/admin/subscriptions">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  college: "IIT Delhi",
                  plan: "Enterprise",
                  amount: "2,50,000",
                  status: "success",
                },
                {
                  college: "NIT Trichy",
                  plan: "Professional",
                  amount: "1,50,000",
                  status: "success",
                },
                {
                  college: "BITS Pilani",
                  plan: "Enterprise",
                  amount: "2,50,000",
                  status: "success",
                },
                {
                  college: "VIT Vellore",
                  plan: "Professional",
                  amount: "1,50,000",
                  status: "pending",
                },
              ].map((txn, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-xl border border-border/70 bg-card/70 p-3"
                >
                  <div className="flex items-center gap-3">
                    {txn.status === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-600" />
                    )}
                    <div>
                      <p className="font-medium">{txn.college}</p>
                      <p className="text-xs text-muted-foreground">
                        {txn.plan} Plan
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Rs. {txn.amount}</p>
                    <Badge
                      variant={txn.status === "success" ? "secondary" : "outline"}
                    >
                      {txn.status === "success" ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* User Distribution */}
          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>Breakdown by role</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { role: "Students", count: 22456, percentage: 90 },
                { role: "CPOs", count: 312, percentage: 1.2 },
                { role: "Recruiters", count: 2045, percentage: 8.2 },
                { role: "Admins", count: 43, percentage: 0.1 },
              ].map((user, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{user.role}</span>
                    <span className="text-muted-foreground">
                      {user.count.toLocaleString()} ({user.percentage}%)
                    </span>
                  </div>
                  <Progress value={user.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts & Issues */}
          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>
                Issues requiring attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  type: "warning",
                  message: "High API latency detected in assessment module",
                  time: "10 min ago",
                },
                {
                  type: "info",
                  message: "Database backup completed successfully",
                  time: "2 hours ago",
                },
                {
                  type: "warning",
                  message: "5 failed payment attempts in last hour",
                  time: "3 hours ago",
                },
              ].map((alert, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/70 p-3"
                >
                  {alert.type === "warning" ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
