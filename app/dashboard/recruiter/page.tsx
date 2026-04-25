// Recruiter Dashboard - Setup Only
// TODO: Implement recruiter-specific features with real data

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Briefcase,
  Users,
  Calendar,
  Send,
  ArrowRight,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
} from "lucide-react";

export default function RecruiterDashboardPage() {
  return (
    <div className="space-y-6">
        {/* Welcome Section with CTA */}
        <div className="flex flex-col gap-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Find Your Next Great Hire
            </h2>
            <p className="mt-1 text-muted-foreground">
              Access verified, placement-ready candidates from top colleges
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" /> Post New Job
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Active Jobs</CardDescription>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="mt-2 text-xs text-muted-foreground">
                Across 3 departments
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Total Applications</CardDescription>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="text-green-600">+45</span> this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Interviews Scheduled</CardDescription>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="mt-2 text-xs text-muted-foreground">
                12 this week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>Offers Made</CardDescription>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="mt-2 text-xs text-muted-foreground">
                12 accepted
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest candidate applications</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Rahul Kumar",
                  role: "Software Engineer",
                  college: "IIT Delhi",
                  score: 92,
                  time: "2 hours ago",
                },
                {
                  name: "Priya Sharma",
                  role: "Frontend Developer",
                  college: "NIT Trichy",
                  score: 88,
                  time: "4 hours ago",
                },
                {
                  name: "Amit Patel",
                  role: "Software Engineer",
                  college: "BITS Pilani",
                  score: 85,
                  time: "6 hours ago",
                },
                {
                  name: "Sneha Singh",
                  role: "Data Analyst",
                  college: "VIT Vellore",
                  score: 82,
                  time: "1 day ago",
                },
              ].map((app, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {app.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{app.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {app.role} - {app.college}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-100 text-green-800">
                      {app.score}%
                    </Badge>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Job Postings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Active Job Postings</CardTitle>
                <CardDescription>Your open positions</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Manage <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Software Engineer",
                  applications: 145,
                  shortlisted: 23,
                  deadline: "Dec 20",
                },
                {
                  title: "Frontend Developer",
                  applications: 89,
                  shortlisted: 15,
                  deadline: "Dec 25",
                },
                {
                  title: "Data Analyst",
                  applications: 67,
                  shortlisted: 8,
                  deadline: "Dec 30",
                },
                {
                  title: "Product Manager",
                  applications: 41,
                  shortlisted: 5,
                  deadline: "Jan 5",
                },
              ].map((job, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.applications} applications - {job.shortlisted}{" "}
                      shortlisted
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Due {job.deadline}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Scheduled for this week</CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                Calendar <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  name: "Rahul Kumar",
                  role: "Software Engineer",
                  time: "Today, 2:00 PM",
                  round: "Technical",
                },
                {
                  name: "Priya Sharma",
                  role: "Frontend Developer",
                  time: "Today, 4:30 PM",
                  round: "HR",
                },
                {
                  name: "Amit Patel",
                  role: "Software Engineer",
                  time: "Tomorrow, 10:00 AM",
                  round: "Technical",
                },
              ].map((interview, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {interview.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{interview.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {interview.time}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{interview.round}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Hiring Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Hiring pipeline updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  action: "Offer accepted",
                  candidate: "Vikram Singh",
                  role: "Software Engineer",
                  icon: CheckCircle2,
                  color: "text-green-600",
                },
                {
                  action: "Interview completed",
                  candidate: "Neha Gupta",
                  role: "Data Analyst",
                  icon: CheckCircle2,
                  color: "text-blue-600",
                },
                {
                  action: "Offer declined",
                  candidate: "Raj Malhotra",
                  role: "Frontend Developer",
                  icon: XCircle,
                  color: "text-red-600",
                },
                {
                  action: "Shortlisted",
                  candidate: "Anita Verma",
                  role: "Product Manager",
                  icon: Users,
                  color: "text-primary",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-lg border p-3"
                >
                  <activity.icon className={`h-5 w-5 ${activity.color}`} />
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.candidate} - {activity.role}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
