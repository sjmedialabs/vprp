// Admin Assessments Management Page - Setup Only
// TODO: Implement assessment and question bank management

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminAssessmentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assessment Management</h1>
        <div className="flex gap-2">
          <Button variant="outline">Import Questions</Button>
          <Button>Create Assessment</Button>
        </div>
      </div>
      
      {/* Search */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap gap-4 pt-6">
          <Input placeholder="Search assessments..." className="max-w-sm" />
          <Button variant="outline">Filter by Type</Button>
          <Button variant="outline">Filter by Difficulty</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="assessments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="questions">Question Bank</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="assessments">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Aptitude Tests</CardTitle>
                <CardDescription>Quantitative, Logical, Verbal</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">0 assessments</p>
                <Button variant="outline" className="mt-4 w-full">Manage</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Technical Tests</CardTitle>
                <CardDescription>Programming and domain tests</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">0 assessments</p>
                <Button variant="outline" className="mt-4 w-full">Manage</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Soft Skills</CardTitle>
                <CardDescription>Communication and behavioral</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">0 assessments</p>
                <Button variant="outline" className="mt-4 w-full">Manage</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Question Bank</CardTitle>
              <CardDescription>Manage all questions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No questions in the bank yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Categories</CardTitle>
              <CardDescription>Organize assessments by category</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Default categories will be created.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
