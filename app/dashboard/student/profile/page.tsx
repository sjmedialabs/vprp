// Student Profile Page - Setup Only
// TODO: Implement profile editing with Supabase

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'

export default function StudentProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Your basic details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="Enter your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="+91 9876543210" />
            </div>
            <Button asChild>
              <Link href="/dashboard/student">Save Changes</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>Your college and course details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="college">College</Label>
              <Input id="college" placeholder="Select your college" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="Select your department" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="enrollmentNumber">Enrollment Number</Label>
              <Input id="enrollmentNumber" placeholder="Enter enrollment number" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="batchYear">Batch Year</Label>
                <Input id="batchYear" type="number" placeholder="2023" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cgpa">CGPA</Label>
                <Input id="cgpa" type="number" step="0.01" placeholder="8.5" />
              </div>
            </div>
            <Button asChild>
              <Link href="/dashboard/student">Save Changes</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Add your technical and soft skills</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Textarea id="skills" placeholder="React, Node.js, Python, Communication..." />
            </div>
            <Button asChild>
              <Link href="/dashboard/student/passport">Update Skills</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Links */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Links</CardTitle>
            <CardDescription>Your online presence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input id="github" placeholder="https://github.com/username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio">Portfolio URL</Label>
              <Input id="portfolio" placeholder="https://yourportfolio.com" />
            </div>
            <Button asChild>
              <Link href="/dashboard/student/passport">Save Links</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Resume */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resume</CardTitle>
            <CardDescription>Upload your latest resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border-2 border-dashed p-8 text-center">
              <p className="text-muted-foreground">Drag and drop your resume here, or click to browse</p>
              <p className="mt-2 text-sm text-muted-foreground">Supported formats: PDF, DOC, DOCX (Max 5MB)</p>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/dashboard/student/passport">Upload Resume</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
