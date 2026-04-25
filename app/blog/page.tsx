import { FadeUp } from "@/components/motion/fade-up";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BlogPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <FadeUp>
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="mt-2 text-muted-foreground">Insights from recruiters, trainers, and alumni.</p>
      </FadeUp>
      <FadeUp delay={0.08} className="mt-6">
        <Card className="glass-card neon-border">
          <CardHeader>
            <CardTitle>Latest Posts</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Blog feed placeholder. CMS/API integration pending.
          </CardContent>
        </Card>
      </FadeUp>
    </div>
  );
}
