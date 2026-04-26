// Admin Settings Page - Setup Only
// TODO: Implement platform-wide settings

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import Link from 'next/link'

export default function AdminSettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Platform Settings</h1>
      
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="email">Email (Mailchimp)</TabsTrigger>
          <TabsTrigger value="payments">Payments (Razorpay)</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Platform-wide configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input id="platformName" defaultValue="VPRP" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Temporarily disable the platform</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Registrations</Label>
                  <p className="text-sm text-muted-foreground">Allow new user registrations</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Button asChild>
                <Link href="/dashboard/admin">Save Settings</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
              <CardDescription>Configure external services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Supabase</p>
                    <p className="text-sm text-muted-foreground">Database and Authentication</p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800">Not Connected</span>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Razorpay</p>
                    <p className="text-sm text-muted-foreground">Payment Gateway</p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800">Not Connected</span>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mailchimp</p>
                    <p className="text-sm text-muted-foreground">Email Marketing</p>
                  </div>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800">Not Connected</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Mailchimp Configuration</CardTitle>
              <CardDescription>Email marketing settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mailchimpApiKey">API Key</Label>
                <Input id="mailchimpApiKey" type="password" placeholder="Enter Mailchimp API Key" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mailchimpServer">Server Prefix</Label>
                <Input id="mailchimpServer" placeholder="e.g., us1, us2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mailchimpListId">Default List ID</Label>
                <Input id="mailchimpListId" placeholder="Enter default audience/list ID" />
              </div>
              <Button asChild>
                <Link href="/dashboard/admin">Save Configuration</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Razorpay Configuration</CardTitle>
              <CardDescription>Payment gateway settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="razorpayKeyId">Key ID</Label>
                <Input id="razorpayKeyId" placeholder="Enter Razorpay Key ID" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="razorpayKeySecret">Key Secret</Label>
                <Input id="razorpayKeySecret" type="password" placeholder="Enter Razorpay Key Secret" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookSecret">Webhook Secret</Label>
                <Input id="webhookSecret" type="password" placeholder="Enter webhook secret" />
              </div>
              <Button asChild>
                <Link href="/dashboard/admin">Save Configuration</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
