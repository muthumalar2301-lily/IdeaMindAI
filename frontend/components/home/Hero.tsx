import Link from "next/link";
export default function Hero() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="mx-auto max-w-4xl text-center">

        {/* Badge */}
        <div className="mb-6 inline-flex rounded-full border bg-muted px-4 py-2 text-sm text-muted-foreground">
          AI-Powered Startup Feasibility Platform
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Turn Your Idea Into a{" "}
          <span className="text-primary">Real Plan.</span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Analyze your startup idea, research competitors, evaluate market
          demand, estimate development costs, and discover opportunities —
          all powered by AI.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/analyze"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Analyze My Idea →
          </Link>

          <button className="rounded-lg border px-6 py-3 font-medium transition-colors hover:bg-muted">
            See How It Works
          </button>
        </div>

        {/* Small text */}
        <p className="mt-5 text-sm text-muted-foreground">
          No complicated forms. Just describe your idea.
        </p>

      </div>
    </section>
  );
}