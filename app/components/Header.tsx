"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { label: "Home", href: "/", testId: "nav-home" },
  { label: "Trips", href: "/trips", testId: "nav-trips" },
  { label: "About", href: "/about", testId: "nav-about" },
  { label: "Contact", href: "/contact", testId: "nav-contact" },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const updateScrolledState = () => {
      setIsScrolled(window.scrollY > 12);
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolledState);
    };
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-scrolled" : "glass"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link data-testid="logo-link" className="flex items-center gap-2 group" href="/">
            <span className="relative block h-10 w-[100px] overflow-hidden rounded-lg shadow-sm md:h-11 md:w-[110px]">
              <Image
                alt="Raahi Trail"
                className="object-cover"
                src="https://customer-assets.emergentagent.com/job_journey-booking-28/artifacts/0mvkbkdr_RAA%E0%A4%B9%E0%A5%80.jpg"
                fill
                preload
                sizes="110px"
              />
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  data-testid={item.testId}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-green"
                      : "text-brand-ink/80 hover:text-brand-ink"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              data-testid="nav-cta-explore" 
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-brand-yellow text-brand-ink text-sm font-semibold hover:bg-brand-ink hover:text-brand-yellow transition-all active:scale-95" 
              href="/trips"
            >
              Explore Trips
            </Link>
            <button data-testid="mobile-menu-toggle" className="md:hidden p-2 rounded-full text-brand-ink" aria-label="Toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu" aria-hidden="true">
                <path d="M4 12h16"></path>
                <path d="M4 18h16"></path>
                <path d="M4 6h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
