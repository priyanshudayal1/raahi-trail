import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Login", href: "/admin/login" },
  { label: "Register", href: "/admin/register" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f4f7f2] text-brand-ink">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            href="/admin/dashboard"
            className="font-display font-bold text-xl tracking-tight"
          >
            Raahi Admin
          </Link>
          <nav className="flex items-center gap-1 rounded-full border border-black/10 bg-brand-paper p-1">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-brand-ink/70 hover:bg-white hover:text-brand-ink transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </main>
  );
}
