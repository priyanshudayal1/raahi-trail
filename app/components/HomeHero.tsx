import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";

const whatsappHref =
  "https://wa.me/919999999999?text=Hi%20Raahi%20Trail!%20Add%20me%20to%20your%20WhatsApp%20community.";

const stats = [
  { number: "200+", label: "Trips run" },
  { number: "3,200+", label: "Happy raahis" },
  { number: "4.9 ★", label: "Avg. rating" },
];

export default function HomeHero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-brand-ink">
      <Image
        alt="Himalayan mountains"
        fill
        loading="eager"
        sizes="100vw"
        className="object-cover animate-ken-burns"
        src="https://images.pexels.com/photos/35080071/pexels-photo-35080071.jpeg?w=1920"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/85" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 pt-32 w-full">
        <p className="text-brand-green uppercase tracking-[0.3em] text-xs md:text-sm font-bold mb-6">
          ✶ Curated Group Trips · Since 2023
        </p>
        <h1 className="font-display text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight max-w-5xl">
          Stop Planning.
          <br />
          <span className="text-brand-yellow">Start Experiencing.</span>
        </h1>
        <p className="mt-8 text-white/85 text-lg md:text-xl max-w-xl font-display">
          Plan mat karo. Bas nikal jao. Curated trips for real travelers,
          crafted by people who live on the road.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            data-testid="hero-explore-btn"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:bg-white transition-all active:scale-95"
            href="/trips"
          >
            Explore Trips <ArrowRightIcon />
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            data-testid="hero-whatsapp-btn"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/25 text-white font-semibold backdrop-blur hover:bg-white hover:text-brand-ink transition-all active:scale-95"
          >
            Join WhatsApp community
          </a>
        </div>
        <div className="mt-16 pt-8 border-t border-white/15 grid grid-cols-3 gap-6 max-w-xl">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-white text-3xl md:text-4xl font-bold">
                {stat.number}
              </div>
              <div className="text-white/60 text-xs uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
