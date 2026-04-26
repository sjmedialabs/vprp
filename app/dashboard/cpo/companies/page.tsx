// CPO Companies Management Page - Setup Only
// TODO: Implement company partnerships and drive management

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function CPOCompaniesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Company Management</h1>
        <Button asChild>
          <Link href="/dashboard/cpo/students">Invite Company</Link>
        </Button>
      </div>
      
      {/* Search */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap gap-4 pt-6">
          <Input placeholder="Search companies..." className="max-w-sm" />
          <Button variant="outline" asChild>
            <Link href="/dashboard/cpo/analytics">Filter by Industry</Link>
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="partners" className="space-y-6">
        <TabsList>
          <TabsTrigger value="partners">Partner Companies</TabsTrigger>
          <TabsTrigger value="active-drives">Active Drives</TabsTrigger>
          <TabsTrigger value="past-drives">Past Drives</TabsTrigger>
        </TabsList>

        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <CardTitle>Partner Companies</CardTitle>
              <CardDescription>Companies associated with your college</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No partner companies yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active-drives">
          <Card>
            <CardHeader>
              <CardTitle>Active Placement Drives</CardTitle>
              <CardDescription>Currently ongoing drives</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No active drives.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="past-drives">
          <Card>
            <CardHeader>
              <CardTitle>Past Drives</CardTitle>
              <CardDescription>Historical placement drives</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No past drives recorded.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
