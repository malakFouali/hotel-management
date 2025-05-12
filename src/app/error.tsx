"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-8 text-center">
      <AlertTriangle className="mb-4 h-16 w-16 text-destructive" />
      <h1 className="mb-2 text-3xl font-semibold text-foreground">
        Oops! Something went wrong.
      </h1>
      <p className="mb-6 text-lg text-muted-foreground">
        We encountered an unexpected issue. Please try again.
      </p>
      {error.message && (
         <p className="mb-6 text-sm text-muted-foreground bg-muted p-3 rounded-md max-w-lg">
          Error details: {error.message}
        </p>
      )}
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        size="lg"
      >
        Try Again
      </Button>
    </div>
  );
}
