const steps = [
  {
    number: "01",
    title: "Describe Your Idea",
    description:
      "Tell IdeaMindAI what you want to build. You can describe your idea in simple words—no technical knowledge required.",
  },
  {
    number: "02",
    title: "AI Analyzes Your Idea",
    description:
      "IdeaMindAI evaluates the market, competitors, target users, business model, risks, development effort, and opportunities.",
  },
  {
    number: "03",
    title: "Get Your Feasibility Report",
    description:
      "Receive a structured report with scores, recommendations, an MVP roadmap, tech stack, and actionable next steps.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-t px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">
            Simple process
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            How IdeaMindAI works
          </h2>

          <p className="mt-4 text-muted-foreground">
            Go from a rough idea to a structured feasibility analysis in
            three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-xl border bg-background p-8"
            >
              <span className="text-4xl font-bold text-primary/30">
                {step.number}
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}