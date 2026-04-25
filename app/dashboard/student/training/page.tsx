// Student Training Page - Setup Only
// TODO: Implement training modules and progress tracking

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function StudentTrainingPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Training Modules</h1>
      
      {/* Progress Overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Overall training completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>0%</span>
            </div>
            <Progress value={0} />
          </div>
        </CardContent>
      </Card>

      {/* Training Categories */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Aptitude Training</CardTitle>
            <CardDescription>Quantitative, Logical, Verbal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={0} />
            <p className="text-sm text-muted-foreground">0 of 12 modules completed</p>
            <Button variant="outline" className="w-full">Continue</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Skills</CardTitle>
            <CardDescription>Programming, DSA, System Design</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={0} />
            <p className="text-sm text-muted-foreground">0 of 20 modules completed</p>
            <Button variant="outline" className="w-full">Continue</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Soft Skills</CardTitle>
            <CardDescription>Communication, Leadership, Teamwork</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={0} />
            <p className="text-sm text-muted-foreground">0 of 8 modules completed</p>
            <Button variant="outline" className="w-full">Continue</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume Building</CardTitle>
            <CardDescription>Create an impactful resume</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={0} />
            <p className="text-sm text-muted-foreground">0 of 5 modules completed</p>
            <Button variant="outline" className="w-full">Continue</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interview Preparation</CardTitle>
            <CardDescription>HR and Technical interview tips</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={0} />
            <p className="text-sm text-muted-foreground">0 of 10 modules completed</p>
            <Button variant="outline" className="w-full">Continue</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Group Discussion</CardTitle>
            <CardDescription>GD topics and strategies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={0} />
            <p className="text-sm text-muted-foreground">0 of 6 modules completed</p>
            <Button variant="outline" className="w-full">Continue</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
