import { FadeUp } from "@/components/motion/fade-up";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CareerTransitionResourcePage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <FadeUp>
        <h1 className="text-3xl font-bold">Career Transition Resources</h1>
        <p className="mt-2 text-muted-foreground">Structured pathways for switching domains and roles.</p>
      </FadeUp>
      <FadeUp delay={0.08} className="mt-6">
        <Card className="glass-card neon-border">
          <CardHeader>
            <CardTitle>Transition Pathways</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Placeholder content for role maps, timelines, and interview tracks.
          </CardContent>
        </Card>
      </FadeUp>
    </div>
  );
}
