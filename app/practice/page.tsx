import { FadeUp } from "@/components/motion/fade-up";
import { TabbedPrepHub } from "@/components/learning/tabbed-prep-hub";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PracticeHubPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 py-10">
      <FadeUp>
        <h1 className="text-3xl font-bold md:text-4xl">Placement Preparation Hub</h1>
        <p className="mt-2 text-muted-foreground">
          Navigate topics by tab, then open deep pages for focused practice.
        </p>
      </FadeUp>

      <FadeUp delay={0.1} className="mt-8">
        <form action="/search" className="glass-card mb-6 flex gap-2 rounded-2xl p-3">
          <Input
            name="q"
            placeholder="Search topics, companies, questions..."
            className="border-white/10 bg-black/50"
          />
          <Button type="submit" className="neon-border bg-primary text-primary-foreground">
            Search
          </Button>
        </form>
        <TabbedPrepHub />
      </FadeUp>
    </div>
  );
}
