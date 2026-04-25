import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim();

  let payload: { success: boolean; data?: Array<{ id: string; title: string; type: string }> } = {
    success: true,
    data: [],
  };

  if (query) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/search?q=${encodeURIComponent(query)}`,
      { cache: "no-store" }
    );
    payload = await response.json();
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold">Search</h1>
      <p className="mt-2 text-muted-foreground">Search topics, companies, and questions.</p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm text-muted-foreground">
          Query: <span className="text-primary">{query || "No query provided"}</span>
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {(payload.data || []).map((result) => (
          <Card key={result.id} className="glass-card neon-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{result.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="outline">{result.type}</Badge>
            </CardContent>
          </Card>
        ))}
        {query && (payload.data || []).length === 0 && (
          <p className="text-sm text-muted-foreground">No results found.</p>
        )}
      </div>
    </div>
  );
}
