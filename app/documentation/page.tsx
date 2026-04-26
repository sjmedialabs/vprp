import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function DocumentationPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold">Documentation</h1>
      <p className="mt-2 text-muted-foreground">
        Product guides for student, CPO, recruiter, and admin workflows.
      </p>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Use onboarding, practice, weekly assessments, rankings, and skill passport sections to follow the
          placement-readiness lifecycle.
        </CardContent>
      </Card>
    </div>
  )
}
