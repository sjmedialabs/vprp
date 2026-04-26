import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ApiReferencePage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold">API Reference</h1>
      <p className="mt-2 text-muted-foreground">
        Public endpoints for authentication, attempts, rankings, passport, and notifications.
      </p>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Available Endpoint Groups</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>/api/auth, /api/attempts, /api/rankings, /api/passport, /api/notifications, /api/search</p>
        </CardContent>
      </Card>
    </div>
  )
}
