// Recruiter Jobs Management Page - Setup Only
// TODO: Implement job posting CRUD operations

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function RecruiterJobsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Job Postings</h1>
        <Button>Create New Job</Button>
      </div>
      
      {/* Search */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap gap-4 pt-6">
          <Input placeholder="Search jobs..." className="max-w-sm" />
          <Button variant="outline">Filter by Status</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
              <CardDescription>Currently accepting applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No active job postings. Create your first job.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>Draft Jobs</CardTitle>
              <CardDescription>Jobs not yet published</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No draft jobs.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closed">
          <Card>
            <CardHeader>
              <CardTitle>Closed Jobs</CardTitle>
              <CardDescription>Positions no longer accepting applications</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No closed jobs.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Jobs</CardTitle>
              <CardDescription>Complete job listing history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No jobs created yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
