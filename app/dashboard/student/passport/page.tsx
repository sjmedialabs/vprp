// Student Skill Passport Page - Setup Only
// TODO: Implement skill passport generation with real data

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StudentPassportPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Skill Passport</h1>
        <div className="flex gap-2">
          <Button variant="outline">Share</Button>
          <Button>Download PDF</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Passport Summary</CardTitle>
            <CardDescription>Verified readiness snapshot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Overall Score</p>
                <p className="text-2xl font-semibold">82</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">National Percentile</p>
                <p className="text-2xl font-semibold">88%</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Verification Status</p>
                <Badge className="mt-2">Verified</Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              This section is scaffolded. Dynamic score computation and trend logic
              will be added during feature implementation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Trend</CardTitle>
            <CardDescription>Last 6 attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-center justify-center rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">
                Trend chart placeholder
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="skills" className="mt-6 space-y-6">
        <TabsList>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skill Matrix</CardTitle>
              <CardDescription>Category-wise proficiency</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Aptitude", value: 85 },
                { label: "Technical", value: 79 },
                { label: "Communication", value: 76 },
                { label: "Problem Solving", value: 88 },
              ].map((skill) => (
                <div key={skill.label} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>{skill.label}</span>
                    <span className="text-muted-foreground">{skill.value}%</span>
                  </div>
                  <Progress value={skill.value} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Verified Projects</CardTitle>
                <CardDescription>Projects linked to your passport</CardDescription>
              </div>
              <Button>Add Project</Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No projects added yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Badges</CardTitle>
              <CardDescription>Milestones unlocked from assessments</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {["Aptitude Pro", "Top 10% Rank", "Consistency Star"].map((badge) => (
                <div key={badge} className="rounded-lg border p-4">
                  <p className="font-medium">{badge}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Badge details to be implemented.
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
