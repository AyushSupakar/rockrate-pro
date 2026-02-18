// app/page.tsx
import { InputPanel } from "@/components/dashboard/InputPanel";
import { ResultPanel } from "@/components/dashboard/ResultPanel"; // <--- Add this import

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Left Sidebar - Input */}
      <div className="w-full md:w-[400px] bg-white h-screen sticky top-0 border-r z-10 overflow-hidden">
        <InputPanel />
      </div>

      {/* Right Area - Results */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900">RockRate Pro</h1>
                <p className="text-slate-500">
                Geotechnical Analysis Dashboard for Underground Excavations.
                </p>
            </div>
            
            {/* The New Result Panel */}
            <ResultPanel />
        </div>
      </div>
    </main>
  );
}