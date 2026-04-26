import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContentSections } from "@/components/learning/content-sections";
import { RightRail } from "@/components/learning/right-rail";
import { BottomCta } from "@/components/learning/bottom-cta";
import { FadeUp } from "@/components/motion/fade-up";

interface DetailPageShellProps {
  title: string;
  breadcrumb: Array<{ label: string; href: string }>;
  difficulty?: "Easy" | "Medium" | "Hard";
  relatedTopics: Array<{ label: string; href: string }>;
  showCodeEditor?: boolean;
}

export function DetailPageShell({
  title,
  breadcrumb,
  difficulty = "Medium",
  relatedTopics,
  showCodeEditor = false,
}: DetailPageShellProps) {
  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <FadeUp>
        <div className="glass-card rounded-2xl p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {breadcrumb.map((crumb, index) => (
              <span key={`${crumb.href}-${crumb.label}-${index}`} className="flex items-center gap-2">
                <Link href={crumb.href} className="hover:text-primary">
                  {crumb.label}
                </Link>
                {index < breadcrumb.length - 1 ? <span>/</span> : null}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-bold">{title}</h1>
            <Badge className="bg-primary/85 text-primary-foreground">{difficulty}</Badge>
          </div>
          <div className="mt-4 flex gap-2">
            <Button asChild variant="outline" className="neon-border">
              <Link href="/practice">Back to Hub</Link>
            </Button>
          </div>
        </div>
      </FadeUp>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <FadeUp delay={0.05}>
          <ContentSections topicTitle={title} showCodeEditor={showCodeEditor} />
        </FadeUp>
        <FadeUp delay={0.08}>
          <RightRail relatedTopics={relatedTopics} />
        </FadeUp>
      </div>

      <FadeUp delay={0.12}>
        <BottomCta />
      </FadeUp>
    </div>
  );
}
