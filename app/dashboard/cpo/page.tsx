// CPO Dashboard - Setup Only
// TODO: Implement CPO-specific features with real data

import { DashboardShell } from "@/components/layout/dashboard-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users,
  Building2,
  Briefcase,
  TrendingUp,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

export default function CPODashboardPage() {
  return (
    <DashboardShell
      role="cpo"
      title="Dashboard"
      userName="Dr. Sharma"
      userEmail="placement@college.edu"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <h2 className="text-2xl font-bold text-foreground">
            Placement Overview - 2024-25
          </h2>
          <p className="mt-1 text-muted-foreground">
            Monitor student placements and manage recruitment activities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Students</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="mt-2 text-xs text-muted-foreground">
                892 eligible for placement
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Placed Students</CardDescription>
              <CheckCircle2 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">456</div>
              <Progress value={51} className="mt-2 h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                51% placement rate
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Active Companies</CardDescription>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-600">+12</span> this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Open Positions</CardDescription>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">234</div>
              <p className="mt-2 text-xs text-muted-foreground">
                Across 45 companies
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Drives */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Placement Drives</CardTitle>
                <CardDescription>Scheduled campus visits</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  company: "TechCorp India",
                  date: "Dec 15, 2024",
                  positions: 25,
                  status: "confirmed",
                },
                {
                  company: "InnovateTech",
                  date: "Dec 18, 2024",
                  positions: 15,
                  status: "confirmed",
                },
                {
                  company: "DataMinds",
                  date: "Dec 22, 2024",
                  positions: 10,
                  status: "pending",
                },
              ].map((drive, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8 text-primary/70" />
                    <div>
                      <p className="font-medium">{drive.company}</p>
                      <p className="text-xs text-muted-foreground">
                        {drive.date} - {drive.positions} positions
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={drive.status === "confirmed" ? "default" : "outline"}
                  >
                    {drive.status === "confirmed" ? "Confirmed" : "Pending"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Actions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Actions</CardTitle>
                <CardDescription>Items requiring attention</CardDescription>
              </div>
              <Badge variant="destructive">5 pending</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  action: "Approve student profiles",
                  count: 23,
                  priority: "high",
                },
                {
                  action: "Verify company documents",
                  count: 5,
                  priority: "medium",
                },
                {
                  action: "Review placement requests",
                  count: 12,
                  priority: "high",
                },
                {
                  action: "Update assessment schedule",
                  count: 1,
                  priority: "low",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    {item.priority === "high" ? (
                      <AlertCircle className="h-5 w-5 text-destructive" />
                    ) : (
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span className="font-medium">{item.action}</span>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Top Students */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Highest ranking students</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View Rankings <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Rahul Kumar", branch: "CSE", score: 95, rank: 1 },
                { name: "Priya Sharma", branch: "IT", score: 93, rank: 2 },
                { name: "Amit Patel", branch: "ECE", score: 91, rank: 3 },
                { name: "Sneha Singh", branch: "CSE", score: 89, rank: 4 },
              ].map((student, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {student.branch}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{student.score}%</Badge>
                    <span className="text-sm font-medium text-muted-foreground">
                      #{student.rank}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Placement Stats Chart Placeholder */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Placement Trends</CardTitle>
                <CardDescription>Monthly placement statistics</CardDescription>
              </div>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-center justify-center rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  Chart component - To be implemented
                </p>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">12.5 LPA</p>
                  <p className="text-xs text-muted-foreground">Avg Package</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">45 LPA</p>
                  <p className="text-xs text-muted-foreground">Highest</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">4 LPA</p>
                  <p className="text-xs text-muted-foreground">Lowest</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
