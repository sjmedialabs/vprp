import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold">Refund Policy</h1>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Refund Rules</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Subscription refunds are evaluated per plan terms and usage status. Contact support with payment id,
          plan, and transaction date for review.
        </CardContent>
      </Card>
    </div>
  )
}
