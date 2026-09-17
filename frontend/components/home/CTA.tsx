import Link from "next/link";
export default function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl rounded-3xl border bg-muted/40 px-6 py-16 text-center shadow-sm">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Have an idea? Let&apos;s test it.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Turn your startup or project idea into a structured feasibility
          analysis and discover whether it is worth building.
        </p>

        <Link
          href="/analyze"
          className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
          Analyze My Idea
        </Link>
      </div>
    </section>
  );
}