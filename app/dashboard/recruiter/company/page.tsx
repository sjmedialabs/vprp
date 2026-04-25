// Recruiter Company Profile Page - Setup Only
// TODO: Implement company profile management

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function RecruiterCompanyPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Company Profile</h1>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Basic company details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" placeholder="Enter company name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" placeholder="https://company.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input id="industry" placeholder="Technology, Finance, etc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companySize">Company Size</Label>
              <Input id="companySize" placeholder="e.g., 100-500 employees" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Company Description */}
        <Card>
          <CardHeader>
            <CardTitle>About Company</CardTitle>
            <CardDescription>Tell students about your company</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your company, culture, and what makes it great to work here..."
                rows={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headquarters">Headquarters</Label>
              <Input id="headquarters" placeholder="City, Country" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="founded">Founded Year</Label>
              <Input id="founded" type="number" placeholder="2020" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Company Logo */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Company Logo</CardTitle>
            <CardDescription>Upload your company logo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border-2 border-dashed p-8 text-center">
              <p className="text-muted-foreground">Drag and drop your logo here, or click to browse</p>
              <p className="mt-2 text-sm text-muted-foreground">Recommended: 200x200px, PNG or JPG</p>
              <Button variant="outline" className="mt-4">Upload Logo</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
