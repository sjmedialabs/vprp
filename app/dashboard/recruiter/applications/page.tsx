// Recruiter Applications Page - Setup Only
// TODO: Implement application pipeline management

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function RecruiterApplicationsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Applications</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard/recruiter/analytics">Export</Link>
        </Button>
      </div>
      
      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap gap-4 pt-6">
          <Input placeholder="Search candidates..." className="max-w-sm" />
          <Button variant="outline" asChild>
            <Link href="/dashboard/recruiter/jobs">Filter by Job</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/recruiter/analytics">Filter by Status</Link>
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
          <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
          <TabsTrigger value="selected">Selected</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
              <CardDescription>Complete application list</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No applications received yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Applications awaiting your review</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No pending applications.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shortlisted">
          <Card>
            <CardHeader>
              <CardTitle>Shortlisted Candidates</CardTitle>
              <CardDescription>Candidates selected for next round</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No shortlisted candidates.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interviewed">
          <Card>
            <CardHeader>
              <CardTitle>Interviewed</CardTitle>
              <CardDescription>Candidates who completed interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No interviewed candidates.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="selected">
          <Card>
            <CardHeader>
              <CardTitle>Selected</CardTitle>
              <CardDescription>Candidates who received offers</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No selected candidates.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
              <CardDescription>Candidates not selected</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No rejected applications.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
