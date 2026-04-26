// Student Jobs Page - Setup Only
// TODO: Implement job listings with filtering

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function StudentJobsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Job Opportunities</h1>
      
      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap gap-4 pt-6">
          <Input placeholder="Search jobs..." className="max-w-sm" />
          <Button variant="outline" asChild>
            <Link href="/dashboard/student/rankings">Filter</Link>
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Job Cards */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Software Engineer</CardTitle>
                  <CardDescription>TechCorp Inc. | Bangalore, India</CardDescription>
                </div>
                <Button asChild>
                  <Link href="/dashboard/student/profile">Apply</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Looking for a software engineer with experience in React and Node.js.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">React</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">Node.js</span>
                  <span className="rounded-full bg-muted px-3 py-1 text-xs">TypeScript</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Package: 8-12 LPA | Experience: 0-2 years
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-muted-foreground">More jobs will appear here when available.</p>
        </TabsContent>

        <TabsContent value="applied">
          <Card>
            <CardHeader>
              <CardTitle>Applied Jobs</CardTitle>
              <CardDescription>Track your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You haven&apos;t applied to any jobs yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Jobs</CardTitle>
              <CardDescription>Jobs you&apos;ve saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No saved jobs.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommended">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Jobs</CardTitle>
              <CardDescription>Based on your profile and skills</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Complete your profile to get personalized recommendations.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
