"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="text-psych-green">Psych</span>
          <span className="text-psych-yellow">Ref</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm text-muted transition-colors hover:text-white">
            Home
          </Link>
          <Link href="/seasons/1" className="text-sm text-muted transition-colors hover:text-white">
            Seasons
          </Link>
          <Link href="/references" className="text-sm text-muted transition-colors hover:text-white">
            References
          </Link>
          <Link href="/contact" className="text-sm text-muted transition-colors hover:text-white">
            Contact
          </Link>
        </div>

        <button className="md:hidden text-muted" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/" className="text-sm text-muted" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/seasons/1" className="text-sm text-muted" onClick={() => setOpen(false)}>Seasons</Link>
            <Link href="/references" className="text-sm text-muted" onClick={() => setOpen(false)}>References</Link>
            <Link href="/contact" className="text-sm text-muted" onClick={() => setOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
