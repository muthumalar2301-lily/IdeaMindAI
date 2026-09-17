"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Competitor = {
  name: string;
  description: string;
  strength: string;
  weakness: string;
};

type SWOT = {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
};

type TechnologyStack = {
  frontend: string;
  backend: string;
  database: string;
  ai: string;
  other: string;
};

type Analysis = {
  summary: string;
  market_demand: string;
  target_users: string;
  competitor_analysis: Competitor[];
  market_gaps: string[];
  differentiation: string[];
  revenue_model: string;
  pros: string[];
  cons: string[];
  key_risks: string[];
  swot: SWOT;
  recommended_mvp: string[];
  development_roadmap: string[];
  technology_stack: TechnologyStack;
  development_cost_estimate: string;
  investor_readiness_score: number;
  final_verdict: string;
};

type AnalysisResult = {
  message: string;
  idea: {
    ideaName: string;
    description: string;
    targetUsers: string;
    industry: string;
  };
  analysis: Analysis;
};

export default function AnalyzePage() {
  const [ideaName, setIdeaName] = useState("");
  const [description, setDescription] = useState("");
  const [targetUsers, setTargetUsers] = useState("");
  const [industry, setIndustry] = useState("");

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ideaName,
          description,
          targetUsers,
          industry,
        }),
      });

      const responseText = await response.text();

      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Backend returned an invalid response. HTTP status: ${response.status}`
        );
      }

      if (!response.ok) {
        const backendMessage =
          data?.detail ||
          data?.message ||
          "Backend returned an error.";

        throw new Error(
          `Backend error (${response.status}): ${backendMessage}`
        );
      }

      setResult(data);
    } catch (error) {
      console.error("ANALYSIS ERROR:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong while analyzing the idea.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-20">
        <div className="mx-auto max-w-5xl">

          {/* HEADER */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Analyze Your Idea
            </h1>

            <p className="mt-4 text-muted-foreground">
              Get an AI-powered feasibility analysis for your startup or
              project idea.
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-12 space-y-6 rounded-2xl border p-8 shadow-sm"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Idea Name
              </label>

              <Input
                type="text"
                placeholder="e.g. ParkShare"
                value={ideaName}
                onChange={(e) => setIdeaName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Describe Your Idea
              </label>

              <Textarea
                placeholder="Explain your startup or project idea..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                required
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Target Users
                </label>

                <Input
                  type="text"
                  placeholder="e.g. College students, working professionals"
                  value={targetUsers}
                  onChange={(e) => setTargetUsers(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Industry / Category
                </label>

                <Input
                  type="text"
                  placeholder="e.g. FinTech, Healthcare, Education"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                />
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Analyzing with AI..."
                : "Analyze My Idea →"}
            </button>
          </form>

          {/* ERROR */}
          {error && (
            <div className="mt-8 rounded-xl border border-red-500/30 bg-red-500/10 p-6">
              <p className="font-medium text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* REPORT */}
          {result && (
            <div className="mt-12 space-y-8">

              {/* REPORT HEADER */}
              <div className="text-center">
                <p className="text-sm font-medium text-primary">
                  AI-POWERED FEASIBILITY REPORT
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {result.idea.ideaName}
                </h2>

                <p className="mt-3 text-muted-foreground">
                  {result.idea.industry || "Startup / Project"}
                </p>
              </div>

              {/* INVESTOR SCORE */}
              <div className="rounded-2xl border p-8 text-center shadow-sm">
                <p className="text-sm font-medium text-muted-foreground">
                  INVESTOR READINESS
                </p>

                <div className="mt-3 text-6xl font-bold">
                  {result.analysis.investor_readiness_score}
                  <span className="text-2xl text-muted-foreground">
                    /100
                  </span>
                </div>

                <p className="mt-3 text-muted-foreground">
                  AI-estimated readiness based on the current idea.
                </p>
              </div>

              {/* SUMMARY */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  💡 Idea Summary
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {result.analysis.summary}
                </p>
              </div>

              {/* MARKET */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  📊 Market Demand
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {result.analysis.market_demand}
                </p>
              </div>

              {/* USERS */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  👥 Target Users
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {result.analysis.target_users}
                </p>
              </div>

              {/* COMPETITORS */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  🏢 Competitor Analysis
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {result.analysis.competitor_analysis.map(
                    (competitor, index) => (
                      <div
                        key={index}
                        className="rounded-xl border p-5"
                      >
                        <h4 className="font-semibold">
                          {competitor.name}
                        </h4>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {competitor.description}
                        </p>

                        <p className="mt-4 text-sm">
                          <strong>Strength:</strong>{" "}
                          {competitor.strength}
                        </p>

                        <p className="mt-2 text-sm">
                          <strong>Weakness:</strong>{" "}
                          {competitor.weakness}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* MARKET GAPS */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  🎯 Market Gaps
                </h3>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  {result.analysis.market_gaps.map(
                    (gap, index) => (
                      <li key={index}>{gap}</li>
                    )
                  )}
                </ul>
              </div>

              {/* DIFFERENTIATION */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  ✨ Differentiation Opportunities
                </h3>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  {result.analysis.differentiation.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              {/* REVENUE */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  💰 Revenue Model
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {result.analysis.revenue_model}
                </p>
              </div>

              {/* PROS & CONS */}
              <div className="grid gap-6 md:grid-cols-2">

                <div className="rounded-2xl border p-6 shadow-sm">
                  <h3 className="text-xl font-semibold">
                    ✅ Pros
                  </h3>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                    {result.analysis.pros.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

                <div className="rounded-2xl border p-6 shadow-sm">
                  <h3 className="text-xl font-semibold">
                    ❌ Cons
                  </h3>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                    {result.analysis.cons.map(
                      (item, index) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>

              </div>

              {/* RISKS */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  ⚠️ Key Risks
                </h3>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                  {result.analysis.key_risks.map(
                    (risk, index) => (
                      <li key={index}>{risk}</li>
                    )
                  )}
                </ul>
              </div>

              {/* SWOT */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  🔍 SWOT Analysis
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  <div className="rounded-xl border p-5">
                    <h4 className="font-semibold">
                      💪 Strengths
                    </h4>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                      {result.analysis.swot.strengths.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="rounded-xl border p-5">
                    <h4 className="font-semibold">
                      🔧 Weaknesses
                    </h4>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                      {result.analysis.swot.weaknesses.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="rounded-xl border p-5">
                    <h4 className="font-semibold">
                      🚀 Opportunities
                    </h4>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                      {result.analysis.swot.opportunities.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="rounded-xl border p-5">
                    <h4 className="font-semibold">
                      🛡️ Threats
                    </h4>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                      {result.analysis.swot.threats.map(
                        (item, index) => (
                          <li key={index}>{item}</li>
                        )
                      )}
                    </ul>
                  </div>

                </div>
              </div>

              {/* MVP */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  🚀 Recommended MVP
                </h3>

                <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted-foreground">
                  {result.analysis.recommended_mvp.map(
                    (feature, index) => (
                      <li key={index}>{feature}</li>
                    )
                  )}
                </ol>
              </div>

              {/* ROADMAP */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  🗺️ Development Roadmap
                </h3>

                <ol className="mt-4 list-decimal space-y-3 pl-5 text-muted-foreground">
                  {result.analysis.development_roadmap.map(
                    (phase, index) => (
                      <li key={index}>{phase}</li>
                    )
                  )}
                </ol>
              </div>

              {/* TECHNOLOGY */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  🛠️ Recommended Technology Stack
                </h3>

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  <div className="rounded-xl border p-4">
                    <strong>Frontend</strong>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.analysis.technology_stack.frontend}
                    </p>
                  </div>

                  <div className="rounded-xl border p-4">
                    <strong>Backend</strong>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.analysis.technology_stack.backend}
                    </p>
                  </div>

                  <div className="rounded-xl border p-4">
                    <strong>Database</strong>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.analysis.technology_stack.database}
                    </p>
                  </div>

                  <div className="rounded-xl border p-4">
                    <strong>AI</strong>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.analysis.technology_stack.ai}
                    </p>
                  </div>

                  <div className="rounded-xl border p-4 md:col-span-2">
                    <strong>Other</strong>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {result.analysis.technology_stack.other}
                    </p>
                  </div>

                </div>
              </div>

              {/* COST */}
              <div className="rounded-2xl border p-6 shadow-sm">
                <h3 className="text-xl font-semibold">
                  💵 Development Cost Estimate
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {result.analysis.development_cost_estimate}
                </p>
              </div>

              {/* FINAL VERDICT */}
              <div className="rounded-2xl border p-8 shadow-sm">
                <h3 className="text-xl font-semibold">
                  🎯 Final Verdict
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {result.analysis.final_verdict}
                </p>
              </div>

            </div>
          )}
        </div>
      </main>
    </>
  );
}