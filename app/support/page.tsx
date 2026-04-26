import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SupportPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold">Support</h1>
      <p className="mt-2 text-muted-foreground">
        Reach support for assessment issues, subscription queries, and account recovery.
      </p>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Contact Channels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm text-muted-foreground">
          <p>Email: support@vprp.in</p>
          <p>Response time: within 24 business hours</p>
        </CardContent>
      </Card>
    </div>
  )
}
