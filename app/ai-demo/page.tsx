import AIAssistantDemo from "../components/AIAssistantDemo";

export default function AiDemoPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl flex-col justify-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
          Demo mode
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
          Journey AI Assistant
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          Use this demo page to test route questions, place names, travel times from Bishkek and misspelled destinations in a focused view.
        </p>
        <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            Try: where is altyn arashn
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            Try: how long to son kul
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            Try: как доехать до иссык кул
          </div>
        </div>
      </div>
      <AIAssistantDemo />
    </main>
  );
}
