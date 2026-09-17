export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <div>
          <p className="text-lg font-semibold">IdeaMindAI</p>
          <p className="text-sm text-muted-foreground">
            Turn ideas into real plans.
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          © 2026 IdeaMindAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}