// CPO Settings Page - Setup Only
// TODO: Implement college settings and subscription management

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CPOSettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      
      <Tabs defaultValue="college" className="space-y-6">
        <TabsList>
          <TabsTrigger value="college">College Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
        </TabsList>

        <TabsContent value="college">
          <Card>
            <CardHeader>
              <CardTitle>College Information</CardTitle>
              <CardDescription>Manage your college profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="collegeName">College Name</Label>
                  <Input id="collegeName" placeholder="Enter college name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collegeCode">College Code</Label>
                  <Input id="collegeCode" placeholder="Enter college code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" placeholder="https://college.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter city" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-4">
                <p className="font-medium">Current Plan: Free Trial</p>
                <p className="text-sm text-muted-foreground">Upgrade to access premium features</p>
                <Button className="mt-4">Upgrade Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Departments</CardTitle>
              <CardDescription>Manage college departments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">No departments added yet.</p>
              <Button>Add Department</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage placement cell team</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">No team members added yet.</p>
              <Button>Invite Team Member</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
