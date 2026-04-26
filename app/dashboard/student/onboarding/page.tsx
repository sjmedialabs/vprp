import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StudentOnboardingForm } from '@/components/student/student-onboarding-form'

export default function StudentOnboardingPage() {
  return (
    <div className="container mx-auto max-w-lg p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Student onboarding</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/student">Back to dashboard</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Profile setup</CardTitle>
          <CardDescription>
            Colleges and branches are loaded from the platform directory. All fields except target
            companies are required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StudentOnboardingForm />
        </CardContent>
      </Card>
    </div>
  )
}
