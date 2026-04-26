// Admin Subscriptions Page - Setup Only
// TODO: Implement subscription plan and payment management

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function AdminSubscriptionsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscriptions & Payments</h1>
        <Button asChild>
          <Link href="/dashboard/admin/settings">Create Plan</Link>
        </Button>
      </div>
      
      {/* Revenue Summary */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Revenue</CardDescription>
            <CardTitle className="text-3xl">INR 0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-3xl">INR 0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Subscriptions</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Payments</CardDescription>
            <CardTitle className="text-3xl">0</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList>
          <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>College Starter</CardTitle>
                <CardDescription>Up to 100 students</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">INR 49,999/year</p>
                <p className="mt-2 text-sm text-muted-foreground">0 active subscriptions</p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link href="/dashboard/admin/settings">Edit Plan</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>College Growth</CardTitle>
                <CardDescription>Up to 500 students</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">INR 99,999/year</p>
                <p className="mt-2 text-sm text-muted-foreground">0 active subscriptions</p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link href="/dashboard/admin/settings">Edit Plan</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>College Enterprise</CardTitle>
                <CardDescription>Unlimited students</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">INR 1,99,999/year</p>
                <p className="mt-2 text-sm text-muted-foreground">0 active subscriptions</p>
                <Button variant="outline" className="mt-4 w-full" asChild>
                  <Link href="/dashboard/admin/settings">Edit Plan</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Payment history via Razorpay</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No transactions yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Generated invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No invoices generated.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
