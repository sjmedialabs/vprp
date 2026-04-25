// Admin Companies Management Page - Setup Only
// TODO: Implement company verification and management

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminCompaniesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Company Management</h1>
        <Button>Add Company</Button>
      </div>
      
      {/* Search */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap gap-4 pt-6">
          <Input placeholder="Search companies..." className="max-w-sm" />
          <Button variant="outline">Filter by Industry</Button>
          <Button variant="outline">Filter by Verification</Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Companies</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="pending">Pending Verification</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Companies</CardTitle>
              <CardDescription>Complete company list</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No companies registered yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified">
          <Card>
            <CardHeader>
              <CardTitle>Verified Companies</CardTitle>
              <CardDescription>Companies approved for hiring</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No verified companies.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Verification</CardTitle>
              <CardDescription>Companies awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No pending verifications.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
              <CardDescription>Companies not approved</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No rejected companies.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
