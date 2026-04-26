import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Data Usage</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          VPRP stores profile, practice, assessment, and ranking data to provide readiness scoring, analytics,
          and verified skill passports with role-based access controls.
        </CardContent>
      </Card>
    </div>
  )
}
