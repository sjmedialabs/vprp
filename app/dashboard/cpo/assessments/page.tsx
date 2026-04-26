import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CPOAssessmentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assessment Management</h1>
        <Button asChild>
          <Link href="/dashboard/cpo/analytics">Create Assessment</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Scheduled College Tests</CardTitle>
          <CardDescription>Manage templates, difficulty, timing, and participation.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          No active assessments yet. Use Create Assessment to start a placement simulation for your final-year batch.
        </CardContent>
      </Card>
    </div>
  )
}
