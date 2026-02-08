import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
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
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Navigate</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted hover:text-white">Home</Link>
              <Link href="/references" className="text-sm text-muted hover:text-white">All References</Link>
              <Link href="/contact" className="text-sm text-muted hover:text-white">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">Seasons</h3>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <Link key={n} href={`/seasons/${n}`} className="text-sm text-muted hover:text-psych-green">
                  S{n}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
          Fan project. Psych is property of USA Network / NBCUniversal. 🍍
        </div>
      </div>
    </footer>
  );
}
