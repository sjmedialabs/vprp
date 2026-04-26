import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function HelpPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold">Help & Support</h1>
      <p className="mt-2 text-muted-foreground">
        Resolve common issues for onboarding, assessments, rankings, and subscriptions.
      </p>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/support">Contact Support</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/documentation">Read Documentation</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
