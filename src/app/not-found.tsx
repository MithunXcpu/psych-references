import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="text-8xl" style={{ animation: "pineapple-float 3s ease-in-out infinite" }}>
        🍍
      </div>
      <h1 className="mt-6 text-4xl font-bold">
        <span className="text-psych-green">404</span> — Page Not Found
      </h1>
      <p className="mt-3 text-lg italic text-muted">
        &quot;I&apos;ve heard it both ways.&quot;
      </p>
      <p className="mt-1 text-sm text-psych-green">— Shawn Spencer</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-psych-green px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-psych-green-light hover:shadow-lg hover:shadow-psych-green/20"
      >
        Take me home
      </Link>
      <p className="mt-6 text-xs text-muted/40">
        Don&apos;t be exactly half of an eleven-pound Black Forest ham.
      </p>
    </div>
  );
}
