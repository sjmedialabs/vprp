import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface RightRailProps {
  relatedTopics: Array<{ label: string; href: string }>;
}

export function RightRail({ relatedTopics }: RightRailProps) {
  return (
    <aside className="space-y-4">
      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle>Related Topics</CardTitle>
          <CardDescription>Continue learning path</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {relatedTopics.map((topic, index) => (
            <Link key={`${topic.href}-${topic.label}-${index}`} href={topic.href} className="chip-glow block rounded-md px-3 py-2 text-sm">
              {topic.label}
            </Link>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle>Progress Tracker</CardTitle>
          <CardDescription>Current topic completion</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="text-primary">32%</span>
          </div>
          <Progress value={32} />
        </CardContent>
      </Card>

      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle>Recommended Next Topic</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Guided recommendation placeholder.</p>
        </CardContent>
      </Card>
    </aside>
  );
}
