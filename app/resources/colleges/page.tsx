import { FadeUp } from "@/components/motion/fade-up";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CollegesResourcePage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <FadeUp>
        <h1 className="text-3xl font-bold">Resources for Colleges</h1>
        <p className="mt-2 text-muted-foreground">Playbooks and implementation guides for placement cells.</p>
      </FadeUp>
      <FadeUp delay={0.08} className="mt-6">
        <Card className="glass-card neon-border">
          <CardHeader>
            <CardTitle>College Toolkit</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Placeholder content for policy templates, assessment calendar guides, and onboarding manuals.
          </CardContent>
        </Card>
      </FadeUp>
    </div>
  );
}
