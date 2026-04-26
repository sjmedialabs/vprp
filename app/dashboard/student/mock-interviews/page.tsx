// Student Mock Interviews Page - Setup Only
// TODO: Implement mock interview scheduling and AI interviews

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function StudentMockInterviewsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Mock Interviews</h1>
      
      {/* Quick Actions */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>AI Mock Interview</CardTitle>
            <CardDescription>Practice with our AI interviewer</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/practice">Start AI Interview</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Schedule with Expert</CardTitle>
            <CardDescription>Book a session with industry experts</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/student/training">Browse Slots</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Peer Practice</CardTitle>
            <CardDescription>Practice with fellow students</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/student">Find Partner</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Your scheduled mock interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No upcoming interviews scheduled.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Interviews</CardTitle>
              <CardDescription>Your past mock interview sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No completed interviews yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Interview Feedback</CardTitle>
              <CardDescription>Review feedback from your interviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Complete an interview to receive feedback.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
