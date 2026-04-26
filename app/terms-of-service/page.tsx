import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Platform Use</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Users agree to provide accurate information, follow assessment integrity rules, and avoid fraudulent
          activity in tests, rankings, and hiring workflows.
        </CardContent>
      </Card>
    </div>
  )
}
