// Student Dashboard - Setup Only
// TODO: Implement student-specific features with real data

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
import {
  FileText,
  Briefcase,
  Video,
  BookOpen,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function StudentDashboardPage() {
  return (
    <DashboardShell
      role="student"
      title="Dashboard"
      userName="John Doe"
      userEmail="john.doe@college.edu"
    >
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-6">
          <h2 className="text-2xl font-bold text-foreground">
            Welcome back, John!
          </h2>
          <p className="mt-1 text-muted-foreground">
            Continue your placement preparation journey. You&apos;re making great
            progress!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Profile Completion</CardDescription>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75%</div>
              <Progress value={75} className="mt-2 h-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                Complete your profile for better matches
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Assessments Completed</CardDescription>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Applications</CardDescription>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="mt-2 text-xs text-muted-foreground">
                2 under review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>College Rank</CardDescription>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#42</div>
              <p className="mt-2 text-xs text-muted-foreground">
                Top 15% in your college
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Assessments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Assessments</CardTitle>
                <CardDescription>
                  Your latest practice tests and evaluations
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Aptitude Test - Quantitative",
                  score: 85,
                  date: "2 days ago",
                  status: "completed",
                },
                {
                  title: "Technical - Data Structures",
                  score: 72,
                  date: "5 days ago",
                  status: "completed",
                },
                {
                  title: "Communication Skills",
                  score: null,
                  date: "Due tomorrow",
                  status: "pending",
                },
              ].map((assessment, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-primary/70" />
                    <div>
                      <p className="font-medium">{assessment.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {assessment.date}
                      </p>
                    </div>
                  </div>
                  {assessment.status === "completed" ? (
                    <Badge variant="secondary">{assessment.score}%</Badge>
                  ) : (
                    <Badge variant="outline">Pending</Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Job Recommendations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Job Recommendations</CardTitle>
                <CardDescription>Jobs matching your profile</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  company: "TechCorp India",
                  role: "Software Engineer",
                  package: "12 LPA",
                  match: 92,
                },
                {
                  company: "InnovateTech",
                  role: "Frontend Developer",
                  package: "10 LPA",
                  match: 88,
                },
                {
                  company: "DataMinds",
                  role: "Data Analyst",
                  package: "8 LPA",
                  match: 75,
                },
              ].map((job, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-8 w-8 text-primary/70" />
                    <div>
                      <p className="font-medium">{job.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {job.company} - {job.package}
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    {job.match}% Match
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>
                  Scheduled mock and actual interviews
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Schedule <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  type: "Mock Interview",
                  topic: "Technical Round",
                  time: "Today, 4:00 PM",
                  duration: "45 min",
                },
                {
                  type: "Company Interview",
                  topic: "TechCorp - HR Round",
                  time: "Tomorrow, 10:00 AM",
                  duration: "30 min",
                },
              ].map((interview, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Video className="h-8 w-8 text-primary/70" />
                    <div>
                      <p className="font-medium">{interview.topic}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {interview.time} ({interview.duration})
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline">{interview.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Training Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>Your learning journey</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Continue <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  course: "DSA Fundamentals",
                  progress: 80,
                  modules: "16/20 modules",
                },
                {
                  course: "Aptitude Mastery",
                  progress: 45,
                  modules: "9/20 modules",
                },
                {
                  course: "Communication Skills",
                  progress: 20,
                  modules: "4/20 modules",
                },
              ].map((course, i) => (
                <div key={i} className="space-y-2 rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary/70" />
                      <span className="font-medium">{course.course}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {course.modules}
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
