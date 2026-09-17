const features = [
  {
    title: "Competitor Analysis",
    description:
      "Discover existing companies, competing products, and gaps in the market.",
  },
  {
    title: "Market Demand",
    description:
      "Evaluate potential demand and identify the users and markets your idea can target.",
  },
  {
    title: "Revenue Model",
    description:
      "Explore realistic ways your idea could generate revenue and grow.",
  },
  {
    title: "Development Cost",
    description:
      "Get an estimated MVP development effort, technology requirements, and costs.",
  },
  {
    title: "SWOT Analysis",
    description:
      "Understand your idea's strengths, weaknesses, opportunities, and threats.",
  },
  {
    title: "MVP Roadmap",
    description:
      "Get a practical development roadmap showing what to build first and what can wait.",
  },
];

export default function Features() {
  return (
    <section id="features" className="border-t bg-muted/30 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">
            Everything you need
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            From idea to feasibility report
          </h2>

          <p className="mt-4 text-muted-foreground">
            IdeaMindAI analyzes the important factors you need to understand
            before investing time and money into building your idea.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-background p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}