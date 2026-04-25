// Student Rankings Page - Setup Only
// TODO: Implement dynamic ranking and percentile logic

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StudentRankingsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Rankings</h1>
        <Button variant="outline">View Full Leaderboard</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>College Rank</CardDescription>
            <CardTitle>#42</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Top 15% in your college</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Department Rank</CardDescription>
            <CardTitle>#9</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Top 10% in CSE department</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>National Percentile</CardDescription>
            <CardTitle>88%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Based on normalized score</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="college" className="mt-6 space-y-6">
        <TabsList>
          <TabsTrigger value="college">College</TabsTrigger>
          <TabsTrigger value="department">Department</TabsTrigger>
          <TabsTrigger value="national">National</TabsTrigger>
        </TabsList>

        <TabsContent value="college">
          <Card>
            <CardHeader>
              <CardTitle>College Leaderboard</CardTitle>
              <CardDescription>Top students in your college</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { rank: 1, name: "Rahul Kumar", score: 95 },
                { rank: 2, name: "Priya Sharma", score: 93 },
                { rank: 3, name: "Amit Patel", score: 91 },
                { rank: 42, name: "You", score: 82, isCurrent: true },
              ].map((row) => (
                <div
                  key={`${row.rank}-${row.name}`}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={row.isCurrent ? "default" : "secondary"}>
                      #{row.rank}
                    </Badge>
                    <p className="font-medium">{row.name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{row.score}%</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="department">
          <Card>
            <CardHeader>
              <CardTitle>Department Leaderboard</CardTitle>
              <CardDescription>Top performers in your department</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Department leaderboard data will be populated after integration.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="national">
          <Card>
            <CardHeader>
              <CardTitle>National Leaderboard</CardTitle>
              <CardDescription>Cross-college benchmark rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                National rankings will be available after ranking pipeline setup.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
