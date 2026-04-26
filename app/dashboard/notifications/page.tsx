import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const notifications = [
  { title: 'Weekly simulation opens tomorrow', type: 'assessment' },
  { title: 'Your rank improved by 14 positions', type: 'ranking' },
  { title: 'Subscription renewal due in 5 days', type: 'billing' },
]

export default function NotificationsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline" asChild>
          <Link href="/dashboard/student">Mark all as read</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Assessment, ranking, payment, and hiring alerts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {notifications.map((item) => (
            <div key={item.title} className="rounded-lg border p-3">
              <p className="font-medium">{item.title}</p>
              <p className="text-xs uppercase text-muted-foreground">{item.type}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
