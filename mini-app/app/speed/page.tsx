import { SpeedMeasure } from "@/components/speed-measure";
import { Header } from "@/components/header";

export default function SpeedPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold mb-4">Internet Speed Test</h1>
        <SpeedMeasure />
      </main>
    </div>
  );
}
