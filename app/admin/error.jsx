"use client";
import { Button } from "@/components/ui/button";

// Error components must be Client Components

export default function Error({ error, reset }) {
  return (
    <div className="h-full w-full flex flex-col gap-5 justify-center items-center">
      <h2>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
