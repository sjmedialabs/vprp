// Student Assessments Page - Setup Only
// TODO: Implement assessments listing and navigation

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function StudentAssessmentsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Assessments</h1>
      
      <Tabs defaultValue="available" className="space-y-6">
        <TabsList>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {/* Aptitude Tests */}
          <Card>
            <CardHeader>
              <CardTitle>Aptitude Tests</CardTitle>
              <CardDescription>Quantitative, Logical, and Verbal Reasoning</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quantitative Aptitude</CardTitle>
                  <CardDescription>30 questions | 45 minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/practice">Start Test</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Logical Reasoning</CardTitle>
                  <CardDescription>25 questions | 30 minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/practice">Start Test</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Verbal Ability</CardTitle>
                  <CardDescription>20 questions | 25 minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/practice">Start Test</Link>
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Technical Tests */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Assessments</CardTitle>
              <CardDescription>Programming and Domain-specific tests</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Data Structures</CardTitle>
                  <CardDescription>20 questions | 60 minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/practice">Start Test</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Algorithms</CardTitle>
                  <CardDescription>15 questions | 45 minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/practice">Start Test</Link>
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Database Management</CardTitle>
                  <CardDescription>20 questions | 30 minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/practice">Start Test</Link>
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Soft Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Soft Skills Assessment</CardTitle>
              <CardDescription>Communication and Behavioral assessments</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Communication Skills</CardTitle>
                  <CardDescription>15 questions | 20 minutes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link href="/practice">Start Test</Link>
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Assessments</CardTitle>
              <CardDescription>Your assessment history</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No assessments completed yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-progress">
          <Card>
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
              <CardDescription>Continue where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No assessments in progress.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
