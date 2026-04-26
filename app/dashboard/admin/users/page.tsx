// Admin Users Management Page - Setup Only
// TODO: Implement user management with filtering and actions

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Download, Plus, Search } from 'lucide-react'
import Link from 'next/link'

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto p-2 md:p-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" asChild>
            <Link href="/dashboard/admin/subscriptions">
              <Download className="h-4 w-4" />
              Export
            </Link>
          </Button>
          <Button className="gap-2" asChild>
            <Link href="/auth/signup">
              <Plus className="h-4 w-4" />
              Add User
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 border-border/70 shadow-sm">
        <CardContent className="flex flex-wrap gap-4 pt-6">
          <div className="relative w-full max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9" />
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/admin/settings">Filter by Role</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/admin/settings">Filter by Status</Link>
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="h-auto flex-wrap rounded-xl bg-muted/80 p-1">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="cpos">CPOs</TabsTrigger>
          <TabsTrigger value="recruiters">Recruiters</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>Complete user list</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No users registered yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>All registered students</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No students registered.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cpos">
          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>College Placement Officers</CardTitle>
              <CardDescription>All registered CPOs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No CPOs registered.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recruiters">
          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>Recruiters</CardTitle>
              <CardDescription>All registered recruiters</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No recruiters registered.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle>Administrators</CardTitle>
              <CardDescription>Platform administrators</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No additional admins.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
