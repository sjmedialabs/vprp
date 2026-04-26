// Recruiter Colleges Page - Setup Only
// TODO: Implement college partnership management

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function RecruiterCollegesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Colleges</h1>
        <Button asChild>
          <Link href="/dashboard/recruiter/company">Request Partnership</Link>
        </Button>
      </div>
      
      {/* Search */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap gap-4 pt-6">
          <Input placeholder="Search colleges..." className="max-w-sm" />
          <Button variant="outline" asChild>
            <Link href="/dashboard/recruiter/analytics">Filter by Location</Link>
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="partners" className="space-y-6">
        <TabsList>
          <TabsTrigger value="partners">Partner Colleges</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="partners">
          <Card>
            <CardHeader>
              <CardTitle>Partner Colleges</CardTitle>
              <CardDescription>Colleges you can hire from</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No partner colleges yet. Request partnerships to start hiring.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discover">
          <Card>
            <CardHeader>
              <CardTitle>Discover Colleges</CardTitle>
              <CardDescription>Find colleges to partner with</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Browse available colleges on the platform.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>Partnership requests awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No pending requests.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
