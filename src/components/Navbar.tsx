"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/seasons/1", label: "Seasons", match: "/seasons" },
  { href: "/references", label: "References" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (link: (typeof links)[number]) => {
    if (link.match) return pathname.startsWith(link.match);
    return pathname === link.href;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-base/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-1 text-xl font-bold">
          <span className="text-psych-green">Psych</span>
          <span className="pineapple-reveal text-sm" aria-hidden="true">
            🍍
          </span>
          <span className="text-psych-yellow">Ref</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm transition-colors hover:text-white ${
                isActive(link) ? "text-white" : "text-muted"
              }`}
            >
              {link.label}
              {isActive(link) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-psych-green"
                />
              )}
            </Link>
          ))}
        </div>

        <button
          className="text-muted transition-colors hover:text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive(link)
                      ? "bg-psych-green/10 text-psych-green"
                      : "text-muted hover:bg-white/5 hover:text-white"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
