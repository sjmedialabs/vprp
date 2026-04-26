import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function RecruiterAnalyticsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Recruiter Analytics</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Shortlist Conversion</CardDescription>
            <CardTitle className="text-3xl">0%</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Time to Shortlist</CardDescription>
            <CardTitle className="text-3xl">0 days</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Qualified Candidates</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Hiring Funnel</CardTitle>
          <CardDescription>Track candidate progression from discovery to interview invite.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">No funnel data available yet.</CardContent>
      </Card>
    </div>
  )
}
