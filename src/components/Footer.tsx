import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-surface">
      {/* Gradient border top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-psych-green to-transparent opacity-50" />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-bold">
              <span className="text-psych-green">Psych</span>
              <span className="text-psych-yellow">Ref</span>
            </div>
            <p className="mt-2 text-sm text-muted">
              Every reference. Every episode. Explained.
            </p>
            <p className="mt-3 text-xs text-muted/60">
              Built with 🍍 by Mithun
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Navigate
            </h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted transition-colors hover:text-psych-green">
                Home
              </Link>
              <Link href="/references" className="text-sm text-muted transition-colors hover:text-psych-green">
                All References
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
              Seasons
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <Link
                  key={n}
                  href={`/seasons/${n}`}
                  className="rounded-md px-2 py-1 text-center text-sm text-muted transition-colors hover:bg-psych-green/10 hover:text-psych-green"
                >
                  S{n}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs text-muted">
          <p>
            Fan project. Psych is property of USA Network / NBCUniversal.
          </p>
          <p className="mt-1 group cursor-default">
            <span className="inline-block transition-transform group-hover:animate-[pineapple-bounce_0.6s_ease]">
              🍍
            </span>{" "}
            <span className="opacity-0 transition-opacity group-hover:opacity-100">
              You know that&apos;s right.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
