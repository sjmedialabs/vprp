import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BottomCtaProps {
  testHref?: string;
}

export function BottomCta({ testHref = "/dashboard/student/assessments" }: BottomCtaProps) {
  return (
    <div className="glass-card mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl p-5">
      <div>
        <h3 className="text-lg font-semibold">Ready for the next step?</h3>
        <p className="text-sm text-muted-foreground">Practice more questions or take a timed test.</p>
      </div>
      <div className="flex gap-2">
        <Button className="neon-border bg-primary text-primary-foreground">Practice More</Button>
        <Button asChild variant="outline" className="neon-border">
          <Link href={testHref}>Take Test</Link>
        </Button>
      </div>
    </div>
  );
}
