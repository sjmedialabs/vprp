"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
        <div className="max-w-md rounded-xl border bg-card p-6 text-center">
          <h2 className="text-xl font-semibold">Something went wrong</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
