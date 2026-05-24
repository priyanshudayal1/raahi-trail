import type { SVGProps } from "react";

const benefits = [
  {
    title: "Curated, not cookie-cutter",
    text: "Every route handpicked by travelers who have lived it. No tourist traps. Bas real stuff.",
    Icon: CompassIcon,
  },
  {
    title: "Your new crew awaits",
    text: "Small groups of 8-16. Strangers on day one. Friends for life by day three.",
    Icon: UsersIcon,
  },
  {
    title: "Zero planning stress",
    text: "Stays, transport, permits, meals - sab sorted. Just pack and show up.",
    Icon: ShieldIcon,
  },
  {
    title: "Trip leaders who care",
    text: "Vetted captains who know the terrain, the people, and the best tea stop.",
    Icon: HeartIcon,
  },
];

export default function WhyRaahiSection() {
  return (
    <section className="py-20 md:py-32 bg-brand-ink grain text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.2em] font-bold text-brand-green mb-3">
              * Why Raahi Trail
            </p>
            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02]">
              We don&apos;t sell trips.
              <br />
              <span className="text-brand-yellow">We sell memories</span> that
              last decades.
            </h2>
            <p className="text-white/70 mt-6 text-lg leading-relaxed max-w-md">
              Strangers se dost bante hai yahan. And those dost turn into
              wedding-invite level friends. No kidding.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {benefits.map(({ title, text, Icon }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-brand-green/15 text-brand-green flex items-center justify-center mb-5">
                  <Icon />
                </div>
                <h3 className="font-display font-bold text-xl mb-2">
                  {title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompassIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
}

function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}

function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
