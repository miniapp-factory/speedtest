"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SPEED_TEST_URL =
  "https://speed.cloudflare.com/__down?size=100MB"; // 100 MB test file with a valid cert

function getEmoji(speedMbps: number) {
  if (speedMbps > 100) return "🚀";
  if (speedMbps > 50) return "⚡";
  if (speedMbps > 20) return "🏎️";
  if (speedMbps > 5) return "🐢";
  return "🐌";
}

export function SpeedMeasure() {
  const [speed, setSpeed] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testSpeed() {
      try {
        setLoading(true);
        setError(null);
        const start = performance.now();
        const response = await fetch(SPEED_TEST_URL, { cache: "no-store" });
        if (!response.ok) throw new Error("Network response was not ok");
        await response.blob(); // consume the data
        const end = performance.now();
        const duration = (end - start) / 1000; // seconds
        const bytes = 100 * 1024 * 1024; // 100 MB
        const bits = bytes * 8;
        const speedMbps = bits / (duration * 1e6);
        setSpeed(speedMbps);
      } catch (e: unknown) {
        const message =
          e instanceof Error ? e.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    }
    testSpeed();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {loading && (
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          <span className="text-muted-foreground">Measuring speed...</span>
        </div>
      )}
      {error && (
        <div className="text-destructive">
          <span>⚠️ {error}</span>
        </div>
      )}
      {!loading && !error && speed !== null && (
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl font-bold">
            {speed.toFixed(2)} Mbps {getEmoji(speed)}
          </span>
          <span className="text-muted-foreground">
            (measured over a 100 MB test file)
          </span>
        </div>
      )}
    </div>
  );
}
