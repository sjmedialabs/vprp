// Admin Colleges Management Page - Setup Only
// TODO: Implement college management and subscription oversight

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminCollegesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">College Management</h1>
        <Button>Add College</Button>
      </div>
      
      {/* Search */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap gap-4 pt-6">
          <Input placeholder="Search colleges..." className="max-w-sm" />
          <Button variant="outline">Filter by Status</Button>
          <Button variant="outline">Filter by Subscription</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Colleges</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="trial">Trial</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Colleges</CardTitle>
              <CardDescription>Complete college list</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No colleges registered yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Subscriptions</CardTitle>
              <CardDescription>Colleges with active plans</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No active subscriptions.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trial">
          <Card>
            <CardHeader>
              <CardTitle>Trial Period</CardTitle>
              <CardDescription>Colleges on free trial</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No colleges on trial.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired">
          <Card>
            <CardHeader>
              <CardTitle>Expired Subscriptions</CardTitle>
              <CardDescription>Colleges with expired plans</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No expired subscriptions.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
