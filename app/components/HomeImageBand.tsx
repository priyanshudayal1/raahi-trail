import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";

const whatsappHref =
  "https://wa.me/919999999999?text=Hi%20Raahi%20Trail!%20I%20want%20to%20know%20more%20about%20your%20trips.";

export default function HomeImageBand() {
  return (
    <section className="relative py-24 md:py-36 overflow-hidden bg-brand-ink text-white">
      <Image
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
        src="https://images.unsplash.com/photo-1641701966318-784c10e9ac4e?w=1920"
      />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-5">
          ✶ Confused what to do?
        </p>
        <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95]">
          Confused what to do next?
          <br />
          <span className="text-brand-yellow">Just Raahi.</span>
        </h2>
        <p className="mt-7 text-white/75 text-lg max-w-2xl mx-auto">
          DM, ping, WhatsApp - whichever is your vibe. Hum vahaan hai.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            data-testid="cta-browse-btn"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-yellow text-brand-ink font-semibold hover:bg-white transition-all active:scale-95"
            href="/trips"
          >
            Browse all trips <ArrowRightIcon />
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            data-testid="cta-wa-btn"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#25D366] text-white font-semibold hover:scale-105 transition-all"
          >
            Chat on WhatsApp
          </a>
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
