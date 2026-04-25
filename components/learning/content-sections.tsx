import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ContentSectionsProps {
  topicTitle: string;
  showCodeEditor?: boolean;
}

export function ContentSections({ topicTitle, showCodeEditor = false }: ContentSectionsProps) {
  return (
    <div className="space-y-6">
      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle>Theory and Concepts</CardTitle>
          <CardDescription>Core understanding for {topicTitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Content placeholder. Detailed concepts will be sourced from topics/questions tables.
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>Hands-on set for revision</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Practice set placeholder. Question rendering will be connected in phase implementation.
          </p>
        </CardContent>
      </Card>

      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle>MCQs</CardTitle>
          <CardDescription>Quick checks for concept retention</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            MCQ list placeholder. Integrated attempts and scoring will be added through API.
          </p>
        </CardContent>
      </Card>

      {showCodeEditor && (
        <Card className="glass-card neon-border">
          <CardHeader>
            <CardTitle>Code Editor</CardTitle>
            <CardDescription>Interactive coding practice area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-white/10 bg-black/50 p-4 font-mono text-sm text-primary/90">
              {`// Editor placeholder for ${topicTitle}\nfunction solve() {\n  return "Not implemented yet";\n}`}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="glass-card neon-border">
        <CardHeader>
          <CardTitle>Solutions and Explanations</CardTitle>
          <CardDescription>Step-by-step references</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Solution placeholders. Explanations and hints will be linked with question records.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
